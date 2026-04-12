import { useRef, useMemo, CSSProperties } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── Simplex noise GLSL ─────────────────────────────────────────────────────────
const NOISE_GLSL = /* glsl */`
  vec3 _mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 _mod289v(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 _permute(vec3 x){return _mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
    vec4 x12=x0.xyxy+C.xxzz;
    x12.xy-=i1;
    i=_mod289v(i);
    vec3 p=_permute(_permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m;m=m*m;
    vec3 x2=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x2)-0.5;
    vec3 ox=floor(x2+0.5);
    vec3 a0=x2-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }
`

const VERTEX_SHADER = /* glsl */`
  ${NOISE_GLSL}
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uBeamIndex;
  varying vec2 vUv;

  void main(){
    vUv=uv;
    float t=uTime*uSpeed*0.18;
    float disp=snoise(vec2(uBeamIndex*0.5+t*0.3,uv.y*2.5+t*0.12))*uNoiseIntensity;
    vec3 pos=position;
    pos.x+=disp;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */`
  uniform vec3 uColor;
  uniform float uAlpha;
  varying vec2 vUv;

  void main(){
    float xFade=smoothstep(0.0,0.5,vUv.x)*smoothstep(1.0,0.5,vUv.x);
    float yFade=smoothstep(0.0,0.06,vUv.y)*smoothstep(1.0,0.94,vUv.y);
    float a=xFade*yFade*uAlpha;
    gl_FragColor=vec4(uColor,a);
  }
`

// ── Single beam mesh ───────────────────────────────────────────────────────────
interface BeamMeshProps {
  index: number
  xPos: number
  width: number
  height: number
  color: THREE.Color
  speed: number
  noiseIntensity: number
  rotation: number
  alpha: number
}

function BeamMesh({ index, xPos, width, height, color, speed, noiseIntensity, rotation, alpha }: BeamMeshProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uTime:           { value: 0 },
    uSpeed:          { value: speed },
    uNoiseIntensity: { value: noiseIntensity * width * 0.5 },
    uBeamIndex:      { value: index },
    uColor:          { value: color },
    uAlpha:          { value: alpha },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  useFrame((_, dt) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += dt
  })

  return (
    <mesh position={[xPos, 0, 0]} rotation={[0, 0, rotation]}>
      <planeGeometry args={[width, height, 1, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ── Scene — positions beams to fill the viewport ───────────────────────────────
interface BeamsSceneProps {
  beamNumber: number
  beamWidth: number
  beamHeight: number
  lightColor: string
  speed: number
  noiseIntensity: number
  scale: number
  rotation: number
}

function BeamsScene({ beamNumber, beamWidth, beamHeight, lightColor, speed, noiseIntensity, scale, rotation }: BeamsSceneProps) {
  const { viewport } = useThree()

  const color = useMemo(() => new THREE.Color(lightColor), [lightColor])

  const beams = useMemo(() => {
    const rng = (seed: number) => ((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1
    return Array.from({ length: beamNumber }, (_, i) => {
      const t   = beamNumber > 1 ? i / (beamNumber - 1) : 0.5
      const x   = (t - 0.5) * viewport.width * 1.05
      const bw  = beamWidth * scale * (0.7 + rng(i * 3.1) * 0.6)
      const bh  = (beamHeight + viewport.height * 1.2) * scale
      const alp = 0.22 + rng(i * 7.3) * 0.22
      return { index: i, xPos: x, width: bw, height: bh, alpha: alp }
    })
  }, [beamNumber, beamWidth, beamHeight, scale, viewport.width, viewport.height])

  return (
    <>
      {beams.map(b => (
        <BeamMesh
          key={b.index}
          {...b}
          color={color}
          speed={speed}
          noiseIntensity={noiseIntensity}
          rotation={rotation}
        />
      ))}
    </>
  )
}

// ── Public component ───────────────────────────────────────────────────────────
export interface BeamsProps {
  beamWidth?:      number
  beamHeight?:     number
  beamNumber?:     number
  lightColor?:     string
  speed?:          number
  noiseIntensity?: number
  scale?:          number
  rotation?:       number
  className?:      string
  style?:          CSSProperties
}

export function Beams({
  beamWidth      = 2,
  beamHeight     = 15,
  beamNumber     = 12,
  lightColor     = '#ffffff',
  speed          = 2,
  noiseIntensity = 1.75,
  scale          = 0.2,
  rotation       = 0,
  className,
  style,
}: BeamsProps) {
  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    >
      <Canvas
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ display: 'block' }}
      >
        <BeamsScene
          beamNumber={beamNumber}
          beamWidth={beamWidth}
          beamHeight={beamHeight}
          lightColor={lightColor}
          speed={speed}
          noiseIntensity={noiseIntensity}
          scale={scale}
          rotation={rotation}
        />
      </Canvas>
    </div>
  )
}
