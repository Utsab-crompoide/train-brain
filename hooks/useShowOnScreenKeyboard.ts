"use client";

import { useEffect, useState } from "react";

/**
 * True when the layout should show the on-screen letter keyboard (phones / tablets).
 * False for typical desktop: wide viewport + fine pointer (mouse / trackpad).
 */
function computeShowOnScreenKeyboard(): boolean {
  if (typeof window === "undefined") return false;
  const desktopLike =
    window.matchMedia("(min-width: 1025px)").matches &&
    window.matchMedia("(pointer: fine)").matches;
  return !desktopLike;
}

export function useShowOnScreenKeyboard(): boolean {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => setShow(computeShowOnScreenKeyboard());
    update();

    const mqWide = window.matchMedia("(min-width: 1025px)");
    const mqFine = window.matchMedia("(pointer: fine)");
    mqWide.addEventListener("change", update);
    mqFine.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      mqWide.removeEventListener("change", update);
      mqFine.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return show;
}
