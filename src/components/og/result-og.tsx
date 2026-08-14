import type { ReactElement } from "react";

export interface ResultOgProps {
  title: string;
  subtitle: string;
  traits: string[];
  accent: string;
  siteLabel: string;
}

const SITE_TITLE = "Personality Archetype Test";

// A 1200x630 social card: clean, modern, high-contrast, readable at small
// sizes in a Twitter/X timeline. Uses only layout + color (no external fonts
// or emoji) so it renders identically everywhere.
export function ResultOg({
  title,
  subtitle,
  traits,
  accent,
  siteLabel,
}: ResultOgProps): ReactElement {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "row",
        background: "#0b1120",
        color: "#f8fafc",
        fontFamily: "sans-serif",
      }}
    >
      {/* Accent rail */}
      <div style={{ display: "flex", width: "20px", background: accent }} />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "72px 80px",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: accent,
              marginRight: "18px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#94a3b8",
              fontWeight: 600,
            }}
          >
            {SITE_TITLE}
          </div>
        </div>

        {/* Title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "44px",
              color: "#94a3b8",
              marginBottom: "8px",
            }}
          >
            I got
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "104px",
              fontWeight: 800,
              lineHeight: 1.05,
              color: accent,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "40px",
              color: "#e2e8f0",
              marginTop: "18px",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Traits */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {traits.slice(0, 4).map((trait) => (
            <div
              key={trait}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "30px",
                fontWeight: 600,
                color: "#f1f5f9",
                background: "rgba(148,163,184,0.16)",
                border: "1px solid rgba(148,163,184,0.28)",
                borderRadius: "999px",
                padding: "12px 26px",
                marginRight: "16px",
                marginTop: "12px",
              }}
            >
              {trait}
            </div>
          ))}
        </div>

        {/* Footer URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "30px",
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex" }}>{siteLabel}</div>
          <div style={{ display: "flex", color: accent, fontWeight: 700 }}>
            Discover your type
          </div>
        </div>
      </div>
    </div>
  );
}
