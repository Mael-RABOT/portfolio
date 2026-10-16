import React, { useEffect, useRef, useState } from 'react';
import { cssColors, grid } from '../../theme/theme.const';
import './GridBackground.css';

// Grid intersections (in cells, from the top-left) that get a small "+" marker
const MARKERS: Array<[number, number]> = [
  [2, 3], [9, 2], [16, 6], [4, 11], [21, 10], [12, 14], [25, 4], [7, 18],
];

const GridPattern: React.FC<{ id: string; stroke: string }> = ({ id, stroke }) => (
  <pattern id={id} width={grid.size} height={grid.size} patternUnits="userSpaceOnUse">
    <path
      d={`M ${grid.size} 0 L 0 0 0 ${grid.size}`}
      fill="none"
      style={{ stroke }} /* CSS variable: follows the theme */
      strokeWidth={1}
      strokeDasharray={grid.dash}
    />
  </pattern>
);

/**
 * Fixed decorative background: dotted grid lines, a few accent markers,
 * and a spotlight that lights the grid under the pointer.
 */
const GridBackground: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reduceMotion || !finePointer) return;

    let frame = 0;
    let pointer = { x: 0, y: 0 };

    const render = () => {
      frame = 0;
      root.style.setProperty('--mx', `${pointer.x}px`);
      root.style.setProperty('--my', `${pointer.y}px`);
    };
    const onPointerMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(render);
    };

    setSpotlight(true);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div ref={rootRef} className="grid-bg" aria-hidden="true">
      <svg className="grid-bg__layer grid-bg__base">
        <defs>
          <GridPattern id="grid-base" stroke={cssColors.gridLine} />
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-base)" />
        {MARKERS.map(([cx, cy], i) => (
          <path
            key={`${cx}-${cy}`}
            className="grid-bg__marker"
            d={`M ${cx * grid.size - 5} ${cy * grid.size} h 10 M ${cx * grid.size} ${cy * grid.size - 5} v 10`}
            pathLength={1}
            style={{ stroke: cssColors.gridMarker, '--i': i } as React.CSSProperties}
            strokeWidth={1}
          />
        ))}
      </svg>
      {spotlight && (
        <svg className="grid-bg__layer grid-bg__spotlight">
          <defs>
            <GridPattern id="grid-lit" stroke={cssColors.gridHighlight} />
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-lit)" />
        </svg>
      )}
    </div>
  );
};

export default GridBackground;
