// src/components/InstagramEmbed.jsx
import { useEffect } from "react";
import { Card } from "./ui.jsx";

/**
 * Instagram embed component
 * @param {string} url - permalink to the Instagram post
 * @param {boolean} captioned - show captions if true
 */
export default function InstagramEmbed({ url, captioned = true }) {
  useEffect(() => {
    // load or re-run Instagram embed script
    const existing = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (!existing) {
      const s = document.createElement("script");
      s.src = "//www.instagram.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    } else if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <Card className="overflow-hidden max-w-xl mx-auto">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        {...(captioned ? { "data-instgrm-captioned": "" } : {})}
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "3px",
          boxShadow:
            "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: "300px",
          minWidth: "326px",
          padding: 0,
          width: "99.375%",
        }}
      ></blockquote>
    </Card>
  );
}
