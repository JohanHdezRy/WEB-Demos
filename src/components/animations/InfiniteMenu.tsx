import {
  type FC,
  useRef,
  useState,
  useEffect,
  type MutableRefObject,
} from "react";
import { mat4, quat, vec2, vec3 } from "gl-matrix";

// ── WebGL Shaders ─────────────────────────────────────────────────────────────

const discVertShaderSource = `#version 300 es

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);
    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    float radius = length(centerPos.xyz);

    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0., abs(strength) - 1.);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
        worldPosition.xyz += stretchDir * strength;
    }

    worldPosition.xyz = radius * normalize(worldPosition.xyz);
    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;
    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}
`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;

out vec4 outColor;

in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
    int itemIndex = vInstanceId % uItemCount;
    int cellsPerRow = uAtlasSize;
    int cellX = itemIndex % cellsPerRow;
    int cellY = itemIndex / cellsPerRow;
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

    ivec2 texSize = textureSize(uTex, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float containerAspect = 1.0;
    float scale = max(imageAspect / containerAspect, containerAspect / imageAspect);

    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = (st - 0.5) * scale + 0.5;
    st = clamp(st, 0.0, 1.0);
    st = st * cellSize + cellOffset;

    outColor = texture(uTex, st);
    outColor.a *= vAlpha;
}
`;

// ── Geometry helpers ──────────────────────────────────────────────────────────

class Face {
  public a: number;
  public b: number;
  public c: number;
  constructor(a: number, b: number, c: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

class Vertex {
  public position: vec3;
  public normal: vec3;
  public uv: vec2;
  constructor(x: number, y: number, z: number) {
    this.position = vec3.fromValues(x, y, z);
    this.normal = vec3.create();
    this.uv = vec2.create();
  }
}

class Geometry {
  public vertices: Vertex[] = [];
  public faces: Face[] = [];

  addVertex(...args: number[]): this {
    for (let i = 0; i < args.length; i += 3)
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));
    return this;
  }

  addFace(...args: number[]): this {
    for (let i = 0; i < args.length; i += 3)
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));
    return this;
  }

  get lastVertex(): Vertex {
    return this.vertices[this.vertices.length - 1];
  }

  subdivide(divisions = 1): this {
    const cache: Record<string, number> = {};
    let f = this.faces;
    for (let d = 0; d < divisions; d++) {
      const next = new Array<Face>(f.length * 4);
      f.forEach((face, ndx) => {
        const mAB = this.getMidPoint(face.a, face.b, cache);
        const mBC = this.getMidPoint(face.b, face.c, cache);
        const mCA = this.getMidPoint(face.c, face.a, cache);
        const i = ndx * 4;
        next[i] = new Face(face.a, mAB, mCA);
        next[i + 1] = new Face(face.b, mBC, mAB);
        next[i + 2] = new Face(face.c, mCA, mBC);
        next[i + 3] = new Face(mAB, mBC, mCA);
      });
      f = next;
    }
    this.faces = f;
    return this;
  }

  spherize(radius = 1): this {
    this.vertices.forEach((v) => {
      vec3.normalize(v.normal, v.position);
      vec3.scale(v.position, v.normal, radius);
    });
    return this;
  }

  get vertexData(): Float32Array {
    return new Float32Array(
      this.vertices.flatMap((v) => Array.from(v.position)),
    );
  }
  get normalData(): Float32Array {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.normal)));
  }
  get uvData(): Float32Array {
    return new Float32Array(this.vertices.flatMap((v) => Array.from(v.uv)));
  }
  get indexData(): Uint16Array {
    return new Uint16Array(this.faces.flatMap((f) => [f.a, f.b, f.c]));
  }

  getMidPoint(
    ndxA: number,
    ndxB: number,
    cache: Record<string, number>,
  ): number {
    const key = ndxA < ndxB ? `k_${ndxB}_${ndxA}` : `k_${ndxA}_${ndxB}`;
    if (Object.prototype.hasOwnProperty.call(cache, key)) return cache[key];
    const a = this.vertices[ndxA].position;
    const b = this.vertices[ndxB].position;
    const ndx = this.vertices.length;
    cache[key] = ndx;
    this.addVertex(
      (a[0] + b[0]) * 0.5,
      (a[1] + b[1]) * 0.5,
      (a[2] + b[2]) * 0.5,
    );
    return ndx;
  }
}

class IcosahedronGeometry extends Geometry {
  constructor() {
    super();
    const t = Math.sqrt(5) * 0.5 + 0.5;
    this.addVertex(
      -1,
      t,
      0,
      1,
      t,
      0,
      -1,
      -t,
      0,
      1,
      -t,
      0,
      0,
      -1,
      t,
      0,
      1,
      t,
      0,
      -1,
      -t,
      0,
      1,
      -t,
      t,
      0,
      -1,
      t,
      0,
      1,
      -t,
      0,
      -1,
      -t,
      0,
      1,
    ).addFace(
      0,
      11,
      5,
      0,
      5,
      1,
      0,
      1,
      7,
      0,
      7,
      10,
      0,
      10,
      11,
      1,
      5,
      9,
      5,
      11,
      4,
      11,
      10,
      2,
      10,
      7,
      6,
      7,
      1,
      8,
      3,
      9,
      4,
      3,
      4,
      2,
      3,
      2,
      6,
      3,
      6,
      8,
      3,
      8,
      9,
      4,
      9,
      5,
      2,
      4,
      11,
      6,
      2,
      10,
      8,
      6,
      7,
      9,
      8,
      1,
    );
  }
}

class DiscGeometry extends Geometry {
  constructor(steps = 4, radius = 1) {
    super();
    const s = Math.max(4, steps);
    const alpha = (2 * Math.PI) / s;
    this.addVertex(0, 0, 0);
    this.lastVertex.uv[0] = 0.5;
    this.lastVertex.uv[1] = 0.5;
    for (let i = 0; i < s; i++) {
      const x = Math.cos(alpha * i);
      const y = Math.sin(alpha * i);
      this.addVertex(radius * x, radius * y, 0);
      this.lastVertex.uv[0] = x * 0.5 + 0.5;
      this.lastVertex.uv[1] = y * 0.5 + 0.5;
      if (i > 0) this.addFace(0, i, i + 1);
    }
    this.addFace(0, s, 1);
  }
}

// ── WebGL utilities ───────────────────────────────────────────────────────────

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function createProgram(
  gl: WebGL2RenderingContext,
  sources: [string, string],
  transformFeedbackVaryings?: string[] | null,
  attribLocations?: Record<string, number>,
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {
    const shader = createShader(gl, type, sources[ndx]);
    if (shader) gl.attachShader(program, shader);
  });
  if (transformFeedbackVaryings)
    gl.transformFeedbackVaryings(
      program,
      transformFeedbackVaryings,
      gl.SEPARATE_ATTRIBS,
    );
  if (attribLocations)
    for (const a in attribLocations)
      if (Object.prototype.hasOwnProperty.call(attribLocations, a))
        gl.bindAttribLocation(program, attribLocations[a], a);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

function makeBuffer(
  gl: WebGL2RenderingContext,
  data: number | ArrayBufferView,
  usage: number,
): WebGLBuffer {
  const buf = gl.createBuffer();
  if (!buf) throw new Error("Failed to create buffer");
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  if (typeof data === "number") gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  else gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return buf;
}

function makeVertexArray(
  gl: WebGL2RenderingContext,
  pairs: Array<[WebGLBuffer, number, number]>,
  indices?: Uint16Array,
): WebGLVertexArrayObject | null {
  const va = gl.createVertexArray();
  if (!va) return null;
  gl.bindVertexArray(va);
  for (const [buf, loc, numElem] of pairs) {
    if (loc === -1) continue;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);
  }
  if (indices) {
    const ib = gl.createBuffer();
    if (ib) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    }
  }
  gl.bindVertexArray(null);
  return va;
}

function resizeCanvas(canvas: HTMLCanvasElement): boolean {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  if (canvas.width === w && canvas.height === h) return false;
  canvas.width = w;
  canvas.height = h;
  return true;
}

function setupTexture(gl: WebGL2RenderingContext): WebGLTexture {
  const tex = gl.createTexture();
  if (!tex) throw new Error("Failed to create texture");
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return tex;
}

// ── ArcballControl ────────────────────────────────────────────────────────────

class ArcballControl {
  public isPointerDown = false;
  public orientation = quat.create();
  public pointerRotation = quat.create();
  public rotationVelocity = 0;
  public rotationAxis = vec3.fromValues(1, 0, 0);
  public snapDirection = vec3.fromValues(0, 0, -1);
  public snapTargetDirection: vec3 | null = null;

  private pointerPos = vec2.create();
  private previousPointerPos = vec2.create();
  private _rv = 0;
  private _combinedQuat = quat.create();
  private readonly EPSILON = 0.1;
  private readonly ID_QUAT = quat.create();
  private canvas: HTMLCanvasElement;
  private cb: (dt: number) => void;

  constructor(canvas: HTMLCanvasElement, cb: (dt: number) => void) {
    this.canvas = canvas;
    this.cb = cb;
    canvas.addEventListener("pointerdown", (e) => {
      vec2.set(this.pointerPos, e.clientX, e.clientY);
      vec2.copy(this.previousPointerPos, this.pointerPos);
      this.isPointerDown = true;
    });
    canvas.addEventListener("pointerup", () => {
      this.isPointerDown = false;
    });
    canvas.addEventListener("pointerleave", () => {
      this.isPointerDown = false;
    });
    canvas.addEventListener("pointermove", (e) => {
      if (this.isPointerDown) vec2.set(this.pointerPos, e.clientX, e.clientY);
    });
    canvas.style.touchAction = "none";
  }

  update(dt: number, targetFrame = 16): void {
    const ts = dt / targetFrame + 0.00001;
    let af = ts;
    const snapRot = quat.create();

    if (this.isPointerDown) {
      const INTENSITY = 0.3 * ts;
      const mid = vec2.sub(
        vec2.create(),
        this.pointerPos,
        this.previousPointerPos,
      );
      vec2.scale(mid, mid, INTENSITY);
      if (vec2.sqrLen(mid) > this.EPSILON) {
        vec2.add(mid, this.previousPointerPos, mid);
        const p = this.project(mid);
        const q = this.project(this.previousPointerPos);
        vec2.copy(this.previousPointerPos, mid);
        af *= 5 / ts;
        this.quatFromVectors(
          vec3.normalize(vec3.create(), p),
          vec3.normalize(vec3.create(), q),
          this.pointerRotation,
          af,
        );
      } else {
        quat.slerp(
          this.pointerRotation,
          this.pointerRotation,
          this.ID_QUAT,
          INTENSITY,
        );
      }
    } else {
      quat.slerp(
        this.pointerRotation,
        this.pointerRotation,
        this.ID_QUAT,
        0.1 * ts,
      );
      if (this.snapTargetDirection) {
        const sqrDist = vec3.squaredDistance(
          this.snapTargetDirection,
          this.snapDirection,
        );
        af *= 0.2 * Math.max(0.1, 1 - sqrDist * 10);
        this.quatFromVectors(
          this.snapTargetDirection,
          this.snapDirection,
          snapRot,
          af,
        );
      }
    }

    const combined = quat.multiply(
      quat.create(),
      snapRot,
      this.pointerRotation,
    );
    this.orientation = quat.multiply(quat.create(), combined, this.orientation);
    quat.normalize(this.orientation, this.orientation);

    quat.slerp(this._combinedQuat, this._combinedQuat, combined, 0.8 * ts);
    quat.normalize(this._combinedQuat, this._combinedQuat);

    const rad = Math.acos(this._combinedQuat[3]) * 2.0;
    const s = Math.sin(rad / 2.0);
    if (s > 0.000001) {
      this.rotationAxis[0] = this._combinedQuat[0] / s;
      this.rotationAxis[1] = this._combinedQuat[1] / s;
      this.rotationAxis[2] = this._combinedQuat[2] / s;
      this._rv += (rad / (2 * Math.PI) - this._rv) * 0.5 * ts;
    }
    this.rotationVelocity = this._rv / ts;
    this.cb(dt);
  }

  private quatFromVectors(a: vec3, b: vec3, out: quat, af = 1): void {
    const axis = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), a, b));
    const angle = Math.acos(Math.max(-1, Math.min(1, vec3.dot(a, b)))) * af;
    quat.setAxisAngle(out, axis, angle);
  }

  private project(pos: vec2): vec3 {
    const r = 2,
      w = this.canvas.clientWidth,
      h = this.canvas.clientHeight;
    const s = Math.max(w, h) - 1;
    const x = (2 * pos[0] - w - 1) / s;
    const y = (2 * pos[1] - h - 1) / s;
    const xySq = x * x + y * y;
    const rSq = r * r;
    const z = xySq <= rSq / 2 ? Math.sqrt(rSq - xySq) : rSq / Math.sqrt(xySq);
    return vec3.fromValues(-x, y, z);
  }
}

// ── InfiniteGridMenu class ────────────────────────────────────────────────────

export interface MenuItem {
  image: string;
  link?: string;
  title: string;
  description: string;
}

class InfiniteGridMenu {
  private gl: WebGL2RenderingContext | null = null;
  private discProgram: WebGLProgram | null = null;
  private discVAO: WebGLVertexArrayObject | null = null;
  private discBuffers!: {
    vertices: Float32Array;
    indices: Uint16Array;
    normals: Float32Array;
    uvs: Float32Array;
  };
  private icoGeo!: IcosahedronGeometry;
  private worldMatrix = mat4.create();
  private tex: WebGLTexture | null = null;
  private control!: ArcballControl;

  private discLocations!: {
    aModelPosition: number;
    aModelUvs: number;
    aInstanceMatrix: number;
    uWorldMatrix: WebGLUniformLocation | null;
    uViewMatrix: WebGLUniformLocation | null;
    uProjectionMatrix: WebGLUniformLocation | null;
    uCameraPosition: WebGLUniformLocation | null;
    uScaleFactor: WebGLUniformLocation | null;
    uRotationAxisVelocity: WebGLUniformLocation | null;
    uTex: WebGLUniformLocation | null;
    uFrames: WebGLUniformLocation | null;
    uItemCount: WebGLUniformLocation | null;
    uAtlasSize: WebGLUniformLocation | null;
  };

  private discInstances!: {
    matricesArray: Float32Array;
    matrices: Float32Array[];
    buffer: WebGLBuffer | null;
  };
  private instancePositions: vec3[] = [];
  private DISC_INSTANCE_COUNT = 0;
  private atlasSize = 1;
  private _time = 0;
  private _dt = 0;
  private _dFrames = 0;
  private _frames = 0;
  private movementActive = false;
  private _stopped = false;
  private _rafId = 0;
  private readonly TFD = 1000 / 60;
  private readonly SPHERE_RADIUS = 2;

  public camera = {
    matrix: mat4.create(),
    near: 0.1,
    far: 40,
    fov: Math.PI / 4,
    aspect: 1,
    position: vec3.fromValues(0, 0, 3),
    up: vec3.fromValues(0, 1, 0),
    matrices: {
      view: mat4.create(),
      projection: mat4.create(),
      inversProjection: mat4.create(),
    },
  };
  public smoothRotationVelocity = 0;
  public scaleFactor = 1.0;
  private canvas: HTMLCanvasElement;
  private items: MenuItem[];
  private onActiveItem: (i: number) => void;
  private onMovement: (moving: boolean) => void;

  constructor(
    canvas: HTMLCanvasElement,
    items: MenuItem[],
    onActiveItem: (i: number) => void,
    onMovement: (moving: boolean) => void,
    onInit?: (inst: InfiniteGridMenu) => void,
    scale = 1.0,
  ) {
    this.canvas = canvas;
    this.items = items;
    this.onActiveItem = onActiveItem;
    this.onMovement = onMovement;
    this.scaleFactor = scale;
    this.camera.position[2] = 3 * scale;
    this.init(onInit);
  }

  resize(): void {
    resizeCanvas(this.canvas);
    if (!this.gl) return;
    this.gl.viewport(
      0,
      0,
      this.gl.drawingBufferWidth,
      this.gl.drawingBufferHeight,
    );
    this.updateProjection();
  }

  run(time = 0): void {
    if (this._stopped) return;
    this._dt = Math.min(32, time - this._time);
    this._time = time;
    this._dFrames = this._dt / this.TFD;
    this._frames += this._dFrames;
    this.animate(this._dt);
    this.render();
    this._rafId = requestAnimationFrame((t) => this.run(t));
  }

  stop(): void {
    this._stopped = true;
    if (this._rafId) cancelAnimationFrame(this._rafId);
  }

  private init(onInit?: (inst: InfiniteGridMenu) => void): void {
    const gl = this.canvas.getContext("webgl2", {
      antialias: true,
      alpha: true,
    });
    if (!gl) throw new Error("No WebGL2");
    this.gl = gl;

    this.discProgram = createProgram(
      gl,
      [discVertShaderSource, discFragShaderSource],
      null,
      {
        aModelPosition: 0,
        aModelNormal: 1,
        aModelUvs: 2,
        aInstanceMatrix: 3,
      },
    );

    this.discLocations = {
      aModelPosition: gl.getAttribLocation(this.discProgram!, "aModelPosition"),
      aModelUvs: gl.getAttribLocation(this.discProgram!, "aModelUvs"),
      aInstanceMatrix: gl.getAttribLocation(
        this.discProgram!,
        "aInstanceMatrix",
      ),
      uWorldMatrix: gl.getUniformLocation(this.discProgram!, "uWorldMatrix"),
      uViewMatrix: gl.getUniformLocation(this.discProgram!, "uViewMatrix"),
      uProjectionMatrix: gl.getUniformLocation(
        this.discProgram!,
        "uProjectionMatrix",
      ),
      uCameraPosition: gl.getUniformLocation(
        this.discProgram!,
        "uCameraPosition",
      ),
      uScaleFactor: gl.getUniformLocation(this.discProgram!, "uScaleFactor"),
      uRotationAxisVelocity: gl.getUniformLocation(
        this.discProgram!,
        "uRotationAxisVelocity",
      ),
      uTex: gl.getUniformLocation(this.discProgram!, "uTex"),
      uFrames: gl.getUniformLocation(this.discProgram!, "uFrames"),
      uItemCount: gl.getUniformLocation(this.discProgram!, "uItemCount"),
      uAtlasSize: gl.getUniformLocation(this.discProgram!, "uAtlasSize"),
    };

    const discGeo = new DiscGeometry(56, 1);
    this.discBuffers = {
      vertices: discGeo.vertexData,
      indices: discGeo.indexData,
      normals: discGeo.normalData,
      uvs: discGeo.uvData,
    };

    this.discVAO = makeVertexArray(
      gl,
      [
        [
          makeBuffer(gl, this.discBuffers.vertices, gl.STATIC_DRAW),
          this.discLocations.aModelPosition,
          3,
        ],
        [
          makeBuffer(gl, this.discBuffers.uvs, gl.STATIC_DRAW),
          this.discLocations.aModelUvs,
          2,
        ],
      ],
      this.discBuffers.indices,
    );

    this.icoGeo = new IcosahedronGeometry();
    this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);
    this.instancePositions = this.icoGeo.vertices.map((v) => v.position);
    this.DISC_INSTANCE_COUNT = this.icoGeo.vertices.length;
    this.initInstances();
    this.initTexture();

    this.control = new ArcballControl(this.canvas, (dt) =>
      this.onControlUpdate(dt),
    );
    this.updateCamera();
    this.updateProjection();
    this.resize();
    onInit?.(this);
  }

  private initTexture(): void {
    if (!this.gl) return;
    const gl = this.gl;
    this.tex = setupTexture(gl);
    const count = Math.max(1, this.items.length);
    this.atlasSize = Math.ceil(Math.sqrt(count));
    const cellSize = 256;
    const offscreen = document.createElement("canvas");
    offscreen.width = this.atlasSize * cellSize;
    offscreen.height = this.atlasSize * cellSize;
    const ctx = offscreen.getContext("2d")!;

    Promise.all(
      this.items.map(
        (item) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.src = item.image;
          }),
      ),
    ).then((images) => {
      images.forEach((img, i) => {
        const x = (i % this.atlasSize) * cellSize;
        const y = Math.floor(i / this.atlasSize) * cellSize;
        ctx.drawImage(img, x, y, cellSize, cellSize);
      });
      gl.bindTexture(gl.TEXTURE_2D, this.tex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        offscreen,
      );
      gl.generateMipmap(gl.TEXTURE_2D);
    });
  }

  private initInstances(): void {
    if (!this.gl || !this.discVAO) return;
    const gl = this.gl;
    const count = this.DISC_INSTANCE_COUNT;
    const arr = new Float32Array(count * 16);
    const matrices: Float32Array[] = [];
    for (let i = 0; i < count; i++) {
      const m = new Float32Array(arr.buffer, i * 64, 16);
      mat4.identity(m as unknown as mat4);
      matrices.push(m);
    }
    this.discInstances = {
      matricesArray: arr,
      matrices,
      buffer: gl.createBuffer(),
    };
    gl.bindVertexArray(this.discVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, arr.byteLength, gl.DYNAMIC_DRAW);
    for (let j = 0; j < 4; j++) {
      const loc = this.discLocations.aInstanceMatrix + j;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 64, j * 16);
      gl.vertexAttribDivisor(loc, 1);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  private animate(dt: number): void {
    if (!this.gl) return;
    this.control.update(dt, this.TFD);
    const scale = 0.25;
    const SCALE_INTENSITY = 0.6;
    this.instancePositions
      .map((p) =>
        vec3.transformQuat(vec3.create(), p, this.control.orientation),
      )
      .forEach((p, ndx) => {
        const s =
          (Math.abs(p[2]) / this.SPHERE_RADIUS) * SCALE_INTENSITY +
          (1 - SCALE_INTENSITY);
        const m = mat4.create();
        mat4.multiply(
          m,
          m,
          mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)),
        );
        mat4.multiply(
          m,
          m,
          mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]),
        );
        mat4.multiply(
          m,
          m,
          mat4.fromScaling(mat4.create(), [s * scale, s * scale, s * scale]),
        );
        mat4.multiply(
          m,
          m,
          mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]),
        );
        mat4.copy(this.discInstances.matrices[ndx], m);
      });
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.discInstances.buffer);
    this.gl.bufferSubData(
      this.gl.ARRAY_BUFFER,
      0,
      this.discInstances.matricesArray,
    );
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    this.smoothRotationVelocity = this.control.rotationVelocity;
  }

  private render(): void {
    if (!this.gl || !this.discProgram) return;
    const gl = this.gl;
    gl.useProgram(this.discProgram);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(
      this.discLocations.uWorldMatrix,
      false,
      this.worldMatrix,
    );
    gl.uniformMatrix4fv(
      this.discLocations.uViewMatrix,
      false,
      this.camera.matrices.view,
    );
    gl.uniformMatrix4fv(
      this.discLocations.uProjectionMatrix,
      false,
      this.camera.matrices.projection,
    );
    gl.uniform3f(
      this.discLocations.uCameraPosition,
      this.camera.position[0],
      this.camera.position[1],
      this.camera.position[2],
    );
    gl.uniform4f(
      this.discLocations.uRotationAxisVelocity,
      this.control.rotationAxis[0],
      this.control.rotationAxis[1],
      this.control.rotationAxis[2],
      this.smoothRotationVelocity * 1.1,
    );
    gl.uniform1i(this.discLocations.uItemCount, this.items.length);
    gl.uniform1i(this.discLocations.uAtlasSize, this.atlasSize);
    gl.uniform1f(this.discLocations.uFrames, this._frames);
    gl.uniform1f(this.discLocations.uScaleFactor, this.scaleFactor);
    gl.uniform1i(this.discLocations.uTex, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.bindVertexArray(this.discVAO);
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      this.discBuffers.indices.length,
      gl.UNSIGNED_SHORT,
      0,
      this.DISC_INSTANCE_COUNT,
    );
    gl.bindVertexArray(null);
  }

  private updateCamera(): void {
    mat4.targetTo(
      this.camera.matrix,
      this.camera.position,
      [0, 0, 0],
      this.camera.up,
    );
    mat4.invert(this.camera.matrices.view, this.camera.matrix);
  }

  private updateProjection(): void {
    if (!this.gl) return;
    const el = this.gl.canvas as HTMLCanvasElement;
    this.camera.aspect = el.clientWidth / el.clientHeight;
    const height = this.SPHERE_RADIUS * 0.35;
    const dist = this.camera.position[2];
    this.camera.fov =
      this.camera.aspect > 1
        ? 2 * Math.atan(height / dist)
        : 2 * Math.atan(height / this.camera.aspect / dist);
    mat4.perspective(
      this.camera.matrices.projection,
      this.camera.fov,
      this.camera.aspect,
      this.camera.near,
      this.camera.far,
    );
    mat4.invert(
      this.camera.matrices.inversProjection,
      this.camera.matrices.projection,
    );
  }

  private onControlUpdate(dt: number): void {
    const ts = dt / this.TFD + 0.0001;
    let damping = 5 / ts;
    let camZ = 3 * this.scaleFactor;
    const moving =
      this.control.isPointerDown ||
      Math.abs(this.smoothRotationVelocity) > 0.01;
    if (moving !== this.movementActive) {
      this.movementActive = moving;
      this.onMovement(moving);
    }
    if (!this.control.isPointerDown) {
      const nearestIdx = this.findNearest();
      this.onActiveItem(nearestIdx % Math.max(1, this.items.length));
      this.control.snapTargetDirection = vec3.normalize(
        vec3.create(),
        this.getWorldPos(nearestIdx),
      );
    } else {
      camZ += this.control.rotationVelocity * 80 + 2.5;
      damping = 7 / ts;
    }
    this.camera.position[2] += (camZ - this.camera.position[2]) / damping;
    this.updateCamera();
  }

  private findNearest(): number {
    const invQ = quat.conjugate(quat.create(), this.control.orientation);
    const nt = vec3.transformQuat(
      vec3.create(),
      this.control.snapDirection,
      invQ,
    );
    let maxD = -1,
      idx = 0;
    this.instancePositions.forEach((p, i) => {
      const d = vec3.dot(nt, p);
      if (d > maxD) {
        maxD = d;
        idx = i;
      }
    });
    return idx;
  }

  private getWorldPos(index: number): vec3 {
    return vec3.transformQuat(
      vec3.create(),
      this.instancePositions[index],
      this.control.orientation,
    );
  }
}

// ── React component ───────────────────────────────────────────────────────────

export interface InfiniteMenuProps {
  items?: MenuItem[];
  scale?: number;
}

const InfiniteMenu: FC<InfiniteMenuProps> = ({ items = [], scale = 1.0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(
    null,
  ) as MutableRefObject<HTMLCanvasElement | null>;
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let sketch: InfiniteGridMenu | null = null;

    sketch = new InfiniteGridMenu(
      canvas,
      items.length
        ? items
        : [
            {
              image: "https://picsum.photos/900/900?grayscale",
              title: "",
              description: "",
            },
          ],
      (idx) => {
        if (items.length) setActiveItem(items[idx % items.length]);
      },
      setIsMoving,
      (sk) => sk.run(),
      scale,
    );

    const onResize = () => sketch?.resize();
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
      sketch?.stop();
    };
  }, [items, scale]);

  const handleClick = () => {
    if (!activeItem?.link) return;
    if (activeItem.link.startsWith("http"))
      window.open(activeItem.link, "_blank");
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          cursor: "grab",
          width: "100%",
          height: "100%",
          display: "block",
          outline: "none",
        }}
      />

      {activeItem && (
        <>
          <h2
            className={`nc-im-title ${isMoving ? "nc-im-inactive" : "nc-im-active"}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "6%",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              fontWeight: 900,
              fontStyle: "italic",
              color: "#F0EEF5",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              userSelect: "none",
              margin: 0,
              maxWidth: "22vw",
              lineHeight: 1.1,
            }}
          >
            {activeItem.title}
          </h2>

          <p
            className={`nc-im-desc ${isMoving ? "nc-im-inactive" : "nc-im-active"}`}
            style={{
              position: "absolute",
              top: "calc(50% + 3rem)",
              left: "6%",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "rgba(155,93,229,0.9)",
              textTransform: "uppercase",
              pointerEvents: "none",
              userSelect: "none",
              maxWidth: "20vw",
              margin: 0,
            }}
          >
            {activeItem.description}
          </p>

          {activeItem.link && (
            <div
              onClick={handleClick}
              className={`nc-im-btn ${isMoving ? "nc-im-inactive" : "nc-im-active"}`}
              style={{
                position: "absolute",
                top: "50%",
                right: "6%",
                transform: "translateY(-50%)",
                width: 56,
                height: 56,
                display: "grid",
                placeItems: "center",
                background: "#9B5DE5",
                border: "2px solid rgba(155,93,229,0.4)",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: 22,
                color: "#F0EEF5",
              }}
            >
              ↗
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InfiniteMenu;
