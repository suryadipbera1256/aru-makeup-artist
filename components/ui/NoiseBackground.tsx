"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

type NoiseProps = {
  /** Layer opacity (the reference uses 0.12). */
  opacity?: number;
  /** Noise tile size; tiled across the viewport for fine, cheap grain. */
  tile?: number;
  blendMode?: "color-dodge" | "screen" | "overlay" | "soft-light" | "multiply";
};

/**
 * NoiseBackground
 * ---------------
 * Fixed full-viewport film-grain layer behind content (dark mode only), per the
 * reference's noise texture: opacity 0.12, blend-mode color-dodge. A small tile
 * of opaque random grayscale is regenerated each frame and tiled across the
 * viewport (cheap), with the layer's overall opacity controlling intensity.
 * Static frame under prefers-reduced-motion.
 */
export function NoiseBackground({
  opacity = 0.12,
  tile = 128,
  blendMode = "color-dodge",
}: NoiseProps) {
  const { theme } = useTheme();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (theme !== "dark") return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const off = document.createElement("canvas");
    off.width = tile;
    off.height = tile;
    const octx = off.getContext("2d");
    if (!octx) return;

    let raf = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const draw = () => {
      const img = octx.createImageData(tile, tile);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      octx.putImageData(img, 0, 0);
      const pattern = ctx.createPattern(off, "repeat");
      if (!pattern) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    const loop = () => {
      draw();
      raf = window.requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) draw();
    else loop();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [theme, tile]);

  if (theme !== "dark") return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 top-0 z-0 h-screen w-full"
      style={{ opacity, mixBlendMode: blendMode, imageRendering: "pixelated" }}
    />
  );
}
