import React from 'react';
import { cssColors, grid } from '../../theme/theme.const';
import './AngleFrame.css';

// One chamfered corner bracket, two grid cells long on each side
const SIZE = grid.size * 2;
const CUT = 14;
const BRACKET = `M 0.5 ${SIZE} V ${CUT} L ${CUT} 0.5 H ${SIZE}`;

interface AngleFrameProps {
  /**
   * `load`: draws once after `delay` seconds.
   * `reveal`: draws when the closest `.reveal` ancestor becomes visible (no extra observer).
   */
  trigger: 'load' | 'reveal';
  delay?: number;
}

/**
 * Decorative chamfered corner brackets (top-left, bottom-right) around the parent,
 * which must be positioned. Hidden on small screens.
 */
const AngleFrame: React.FC<AngleFrameProps> = ({ trigger, delay = 0 }) => (
  <span
    className={`angle-frame angle-frame--${trigger}`}
    style={{ '--frame-delay': `${delay}s` } as React.CSSProperties}
    aria-hidden="true"
  >
    {(['start', 'end'] as const).map((corner) => (
      <svg key={corner} className={`angle-frame__corner angle-frame__corner--${corner}`} width={SIZE} height={SIZE}>
        <path d={BRACKET} pathLength={1} fill="none" strokeWidth={1} style={{ stroke: cssColors.accent }} />
      </svg>
    ))}
  </span>
);

export default AngleFrame;
