"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Před",
  afterLabel = "Po",
  initialPosition = 40,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPositionFromEvent = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setPosition((x / rect.width) * 100);
    },
    []
  );

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    getPositionFromEvent(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => getPositionFromEvent(e.clientX);
    const onTouchMove = (e: TouchEvent) => getPositionFromEvent(e.touches[0].clientX);
    const onUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, getPositionFromEvent]);

  // Click anywhere on container to move slider
  const onContainerClick = (e: React.MouseEvent) => {
    if (!isDragging) getPositionFromEvent(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none cursor-col-resize"
      style={{ aspectRatio: "16/9" }}
      onClick={onContainerClick}
      role="img"
      aria-label={`Porovnání: ${beforeLabel} vs ${afterLabel}`}
    >
      {/* After image (full) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${100 / (position / 100)}%`, minWidth: "100%" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center ${isDragging ? "scale-110" : ""} transition-transform duration-150`}
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* Outer ring */}
        <div className="w-11 h-11 rounded-full bg-[hsl(38,91%,55%)] shadow-lg flex items-center justify-center">
          {/* Arrows */}
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="shrink-0">
            <path d="M6 7H1M1 7L4 4M1 7L4 10" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 7H19M19 7L16 4M19 7L16 10" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-sans px-3 py-1.5 bg-black/60 backdrop-blur-sm text-[#9ca8b4] border border-white/10"
          style={{ opacity: position < 15 ? 0 : 1, transition: "opacity 0.2s" }}
        >
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-sans px-3 py-1.5 bg-black/60 backdrop-blur-sm text-[hsl(38,91%,55%)] border border-[hsl(38,91%,55%)/30]"
          style={{ opacity: position > 85 ? 0 : 1, transition: "opacity 0.2s" }}
        >
          {afterLabel}
        </span>
      </div>

      {/* Gradient vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
    </div>
  );
}
