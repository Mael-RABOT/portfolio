import { grid, motion } from '../../theme/theme.const';

const STEP_MS = 40;      // same cadence as DecodeText: stepped, reads as digital
const MAX_CELLS = 1200;  // above that (4K screens), cells double so the paths stay small
const JITTER = 1.5;      // in cells: breaks the circle into a ragged, pixelated front

/**
 * Keyframes for the theme switch's pixel dissolve, on the background grid (fixed at the
 * viewport origin, so the blocks sit on the visible dotted lines).
 * Cells flip from the origin outwards, one step every STEP_MS:
 *  - `next` clips the new snapshot to the cells already flipped,
 *  - `prev` cuts those cells, plus the ones flipping now, out of the old snapshot.
 * The cells flipping now show neither snapshot: the `::view-transition` background (accent) shows through.
 */
export function pixelRevealFrames(originX: number, originY: number): { next: Keyframe[]; prev: Keyframe[] } {
  const w = window.innerWidth;
  const h = window.innerHeight;
  let size: number = grid.size;
  while (Math.ceil(w / size) * Math.ceil(h / size) > MAX_CELLS) size *= 2;

  const frames = Math.max(2, Math.round((motion.theme * 1000) / STEP_MS));
  const cells: Array<{ path: string; d: number }> = [];
  for (let y = 0; y < h; y += size) {
    for (let x = 0; x < w; x += size) {
      const d = Math.hypot(x + size / 2 - originX, y + size / 2 - originY) / size + Math.random() * JITTER;
      cells.push({ path: `M${x} ${y}h${size}v${size}h${-size}Z`, d });
    }
  }
  const maxD = Math.max(...cells.map((c) => c.d)) || 1;
  const steps = cells.map((c) => Math.min(frames - 1, Math.floor((c.d / maxD) * frames)));

  const pathOf = (until: number) => cells.filter((_, i) => steps[i] <= until).map((c) => c.path).join('');
  const viewport = `M0 0H${w}V${h}H0Z`;

  const next: Keyframe[] = [];
  const prev: Keyframe[] = [];
  for (let k = 0; k <= frames; k++) {
    const offset = k / frames;
    // step-end: each frame holds, then jumps (no tweening between unrelated paths)
    const flipped = k === 0 ? '' : pathOf(k - 1);
    next.push({ offset, easing: 'step-end', clipPath: k === frames ? 'inset(0)' : flipped ? `path("${flipped}")` : 'inset(50%)' });
    prev.push({ offset, easing: 'step-end', clipPath: k === frames ? 'inset(50%)' : `path(evenodd, "${viewport}${pathOf(k)}")` });
  }
  return { next, prev };
}
