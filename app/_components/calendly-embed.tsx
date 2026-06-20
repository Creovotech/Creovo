"use client";

import { useEffect } from "react";
import { CAL_URL } from "./constants";

export function CalendlyEmbed() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      try {
        document.body.removeChild(s);
      } catch {
        /* already gone */
      }
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget overflow-hidden rounded-xl border border-line bg-white"
      data-url={`${CAL_URL}?hide_gdpr_banner=1&background_color=ffffff&primary_color=ff4d2e`}
      style={{ minWidth: 320, height: 700 }}
    />
  );
}
