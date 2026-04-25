import Folder from "../../../components/Folder";
import { C, FOLDER_SCALE, FOLDER_CELL_H } from "../data/tokens";
import { FOLDERS } from "../data/vinylData";
import type { FolderItem } from "../types";

function FolderCell({ folder }: { folder: FolderItem }) {
  const items = folder.imgs.map((src, i) => (
    <img
      key={i}
      src={src}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 10,
      }}
    />
  ));

  return (
    <div className="nc-folder-cell">
      <div
        style={{
          width: "100%",
          height: FOLDER_CELL_H,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "visible",
          paddingBottom: "0.5rem",
        }}
      >
        <div
          style={{
            transformOrigin: "bottom center",
            transform: `scale(${FOLDER_SCALE})`,
          }}
        >
          <Folder size={1} color={C.accent} items={items} />
        </div>
      </div>

      <div style={{ width: "100%", textAlign: "center", padding: "0 0.5rem" }}>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: C.text,
            margin: "0 0 0.25rem",
          }}
        >
          {folder.title}
        </h3>
        <p
          style={{
            fontFamily: "'Newsreader', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: C.textMuted,
            margin: "0 0 0.75rem",
          }}
        >
          {folder.subtitle}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${C.outline}33`,
            paddingTop: "0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.58rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: `${C.textMuted}88`,
            }}
          >
            {folder.genre}
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: C.primary,
            }}
          >
            {folder.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CitySessions() {
  return (
    <section style={{ padding: "8rem 4vw", background: C.bgLow }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: C.secondary,
              }}
            >
              Catalog Update
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontWeight: 700,
                color: C.text,
                margin: "0.5rem 0 0",
                lineHeight: 1,
              }}
            >
              City Sessions
            </h2>
          </div>
          <button className="nc-outline-btn">View All</button>
        </div>

        <div
          className="nc-folder-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
        >
          {FOLDERS.map((folder) => (
            <FolderCell key={folder.title} folder={folder} />
          ))}
        </div>

        <div style={{ marginTop: "5rem", textAlign: "center" }}>
          <button className="nc-primary-btn">Explore Full Catalog</button>
        </div>
      </div>
    </section>
  );
}
