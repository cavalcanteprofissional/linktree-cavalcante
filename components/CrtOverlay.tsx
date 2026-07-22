"use client";

import { useEffect, useState } from "react";

export default function CrtOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("crt-played")) return;
    sessionStorage.setItem("crt-played", "true");
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 animate-crt-flash"
        onAnimationEnd={() => setShow(false)}
      />
      <div className="fixed inset-0 z-50 animate-crt-scanlines" />
      <div className="fixed inset-0 z-40 animate-crt-wobble" />
    </>
  );
}
