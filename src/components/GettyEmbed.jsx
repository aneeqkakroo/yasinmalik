import { useEffect, useRef } from "react";

/**
 * GettyEmbed renders a Getty image widget reliably in React.
 * Props:
 *  - id: string (unique DOM id for the widget anchor)
 *  - items: string (Getty image ID, e.g. "56869743")
 *  - width: string (e.g. "594px")
 *  - height: string (e.g. "423px")
 *  - caption: boolean
 *  - tld: "com" | "co.uk" etc.
 *  - is360: boolean
 */
export default function GettyEmbed({
  id,
  items,
  width = "594px",
  height = "423px",
  caption = true,
  tld = "com",
  is360 = false,
}) {
  const anchorRef = useRef(null);

  useEffect(() => {
    // Ensure the Getty script exists once
    function ensureGettyScript() {
      return new Promise((resolve) => {
        const existing = document.querySelector("script#getty-widgets-js");
        if (existing) return existing.addEventListener("load", () => resolve());

        const s = document.createElement("script");
        s.id = "getty-widgets-js";
        s.src = "https://embed-cdn.gettyimages.com/widgets.js";
        s.async = true;
        s.onload = () => resolve();
        document.body.appendChild(s);
      });
    }

    async function init() {
      await ensureGettyScript();
      // Create global gie function if not present
      window.gie =
        window.gie ||
        function (c) {
          (window.gie.q = window.gie.q || []).push(c);
        };
      // Ask widget to load this anchor
      window.gie(function () {
        if (window.gie.widgets?.load) {
          window.gie.widgets.load({
            id,
            sig: "", // optional signature not required for basic loads
            w: width,
            h: height,
            items,
            caption,
            tld,
            is360,
          });
        }
      });
    }

    init();
  }, [id, items, width, height, caption, tld, is360]);

  return (
    <div className="p-2">
      {/* This anchor is what the Getty script transforms */}
      <a
        id={id}
        ref={anchorRef}
        className="gie-single"
        href={`https://www.gettyimages.${tld}/detail/${items}`}
        target="_blank"
        rel="noreferrer"
        style={{
          color: "#a7a7a7",
          textDecoration: "none",
          fontWeight: "normal",
          border: "none",
          display: "inline-block",
        }}
      >
        Embed from Getty Images
      </a>
    </div>
  );
}
