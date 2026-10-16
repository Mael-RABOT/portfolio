import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../Components/Motion/useReducedMotion';
import { cssColors as c, fonts } from '../../theme/theme.const';

// Colours go through `style` (CSS variables don't work in SVG presentation attributes)
import { useInViewOnce } from '../../Components/Motion/useInViewOnce';

type NodeId =
  | 'lcp' | 'cli' | 'huri' | 'custom'
  | 'core' | 'packages' | 'firmware' | 'ws'
  | 'inmoov' | 'so101' | 'more';

type Column = 'interfaces' | 'core' | 'robots';

interface DiagramNode {
  id: NodeId;
  column: Column;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Dashed outline: "open slot", more to come */
  ghost?: boolean;
  /** Row drawn inside the core block */
  inner?: boolean;
}

// Layout (SVG units). Interfaces → core → robots, left to right.
const COL = {
  interfaces: { x: 10, w: 170 },
  core: { x: 250, w: 260 },
  robots: { x: 580, w: 170 },
};
const ROW_H = 46;
const rowY = (i: number) => 50 + i * 64; // 50, 114, 178, 242

const CORE = { x: COL.core.x, y: 50, w: COL.core.w, h: 300 };

const NODES: DiagramNode[] = [
  { id: 'lcp', column: 'interfaces', ...COL.interfaces, y: rowY(0), h: ROW_H },
  { id: 'cli', column: 'interfaces', ...COL.interfaces, y: rowY(1), h: ROW_H },
  { id: 'huri', column: 'interfaces', ...COL.interfaces, y: rowY(2), h: ROW_H },
  { id: 'custom', column: 'interfaces', ...COL.interfaces, y: rowY(3), h: ROW_H, ghost: true },

  { id: 'packages', column: 'core', x: CORE.x + 16, w: CORE.w - 32, y: 112, h: 38, inner: true },
  { id: 'firmware', column: 'core', x: CORE.x + 16, w: CORE.w - 32, y: 160, h: 38, inner: true },
  { id: 'ws', column: 'core', x: CORE.x + 16, w: CORE.w - 32, y: 226, h: 38, inner: true },

  { id: 'inmoov', column: 'robots', ...COL.robots, y: rowY(1) - 32, h: ROW_H },
  { id: 'so101', column: 'robots', ...COL.robots, y: rowY(2) - 32, h: ROW_H },
  { id: 'more', column: 'robots', ...COL.robots, y: rowY(3) - 32, h: ROW_H, ghost: true },
];

const centerY = (n: DiagramNode) => n.y + n.h / 2;
const byId = (id: NodeId) => NODES.find((n) => n.id === id)!;

// Every interface plugs into the core; the core drives every robot.
const EDGES = NODES.filter((n) => n.column !== 'core').map((n) => {
  const y = centerY(n);
  return n.column === 'interfaces'
    ? { node: n.id, ghost: n.ghost, d: `M ${n.x + n.w} ${y} L ${CORE.x} ${y}` }
    : { node: n.id, ghost: n.ghost, d: `M ${CORE.x + CORE.w} ${y} L ${n.x} ${y}` };
});

const CUT = 10;

// Text sizes in SVG units (the whole drawing scales with its container)
const TEXT = { label: 11, small: 12, inner: 13, node: 14, title: 16 };
const chamferPoints = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }, cut = CUT) =>
  [[x, y], [x + w - cut, y], [x + w, y + cut], [x + w, y + h], [x + cut, y + h], [x, y + h - cut]]
    .map((p) => p.join(','))
    .join(' ');

const isCorePart = (id: NodeId) => id === 'core' || byId(id as Exclude<NodeId, 'core'>)?.column === 'core';

/** Interactive architecture diagram of the Lucy stack. */
const LucyDiagram: React.FC = () => {
  const { t } = useTranslation('home');
  const reduce = useReducedMotion();
  const [active, setActive] = useState<NodeId>('core');
  const [ref, visible] = useInViewOnce<HTMLElement>();

  const select = (id: NodeId) => ({
    onMouseEnter: () => setActive(id),
    onFocus: () => setActive(id),
    onClick: () => setActive(id),
  });
  const edgeLit = (node: NodeId) => node === active || isCorePart(active);
  const title = (id: NodeId) => t(`lucy.diagram.nodes.${id}.title`);

  const groups: Array<{ column: Column; ids: NodeId[] }> = [
    { column: 'interfaces', ids: ['lcp', 'cli', 'huri', 'custom'] },
    { column: 'core', ids: ['core', 'packages', 'firmware', 'ws'] },
    { column: 'robots', ids: ['inmoov', 'so101', 'more'] },
  ];

  return (
    <figure ref={ref} className={`diagram chamfer ${visible ? 'is-visible' : ''}`} aria-label={t('lucy.diagram.label')}>
      {/* Desktop / tablet: SVG diagram */}
      <svg viewBox="0 0 760 370" className="diagram__svg" role="presentation">
        {(['interfaces', 'core', 'robots'] as Column[]).map((column) => (
          <text
            key={column}
            x={COL[column].x}
            y={24}
            style={{ fill: c.accent }}
            fontFamily={fonts.mono}
            fontSize={TEXT.label}
            letterSpacing="0.14em"
          >
            {t(`lucy.diagram.columns.${column}`).toUpperCase()}
          </text>
        ))}

        {EDGES.map((edge, i) => {
          const lit = edgeLit(edge.node);
          return (
            <g key={edge.node}>
              <path
                d={edge.d}
                pathLength={1}
                className={`diagram__edge ${edge.ghost ? 'diagram__edge--ghost' : ''}`}
                style={{ '--d': `${0.3 + i * 0.08}s`, stroke: lit ? c.accent : c.lineStrong } as React.CSSProperties}
                fill="none"
                strokeWidth={1}
              />
              {!reduce && !edge.ghost && (
                <circle r={2.5} style={{ fill: c.accent }} opacity={lit ? 1 : 0.3}>
                  <animateMotion dur={`${2 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={edge.d} />
                </circle>
              )}
            </g>
          );
        })}

        {/* Core block */}
        <g className="diagram__node" tabIndex={0} role="button" aria-pressed={active === 'core'} aria-label={title('core')} {...select('core')}>
          <polygon
            points={chamferPoints(CORE, 14)}
            style={{
              fill: active === 'core' ? c.accentSoft : c.surface,
              stroke: isCorePart(active) ? c.accent : c.lineStrong,
            }}
            strokeWidth={1}
          />
          <text x={CORE.x + 16} y={CORE.y + 28} style={{ fill: active === 'core' ? c.accent : c.text }} fontFamily={fonts.mono} fontSize={TEXT.title} fontWeight={600}>
            {title('core')}
          </text>
          <text x={CORE.x + 16} y={CORE.y + 48} style={{ fill: c.textMuted }} fontFamily={fonts.mono} fontSize={TEXT.small}>
            ROS 2 · C++ · Rust · Python
          </text>
          <text x={CORE.x + 16} y={CORE.y + 256} style={{ fill: c.textMuted }} fontFamily={fonts.mono} fontSize={TEXT.small}>
            {t('lucy.diagram.install')}
          </text>
          <text x={CORE.x + 16} y={CORE.y + 276} style={{ fill: c.textMuted }} fontFamily={fonts.mono} fontSize={TEXT.small}>
            macOS · Windows · Linux
          </text>
        </g>

        {NODES.map((node, i) => {
          const selected = node.id === active;
          return (
            <g
              key={node.id}
              className="diagram__node diagram__node--enter"
              style={{ '--d': `${i * 0.06}s` } as React.CSSProperties}
              tabIndex={0}
              role="button"
              aria-pressed={selected}
              aria-label={title(node.id)}
              {...select(node.id)}
            >
              <polygon
                points={chamferPoints(node, node.inner ? 7 : CUT)}
                style={{
                  fill: selected ? c.accentSoft : node.inner ? c.bg : c.surface,
                  stroke: selected ? c.accent : node.ghost ? c.line : c.lineStrong,
                }}
                strokeDasharray={node.ghost ? '4 4' : undefined}
                strokeWidth={1}
              />
              <text
                x={node.x + node.w / 2}
                y={centerY(node)}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fill: selected ? c.accent : node.ghost ? c.textMuted : c.text }}
                fontFamily={fonts.mono}
                fontSize={node.inner ? TEXT.inner : TEXT.node}
              >
                {title(node.id)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mobile: same nodes as a stacked list */}
      <div className="diagram__stack">
        {groups.map((group, gi) => (
          <div key={group.column} className="diagram__group">
            <span className="diagram__group-label">{t(`lucy.diagram.columns.${group.column}`)}</span>
            <div className="diagram__chips">
              {group.ids.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active === id}
                  className={`diagram__chip ${active === id ? 'is-active' : ''} ${id === 'custom' || id === 'more' ? 'is-ghost' : ''}`}
                  onClick={() => setActive(id)}
                >
                  {title(id)}
                </button>
              ))}
            </div>
            {gi < groups.length - 1 && <span className="diagram__connector" aria-hidden="true" />}
          </div>
        ))}
      </div>

      <figcaption className="diagram__caption" aria-live="polite">
        {/* re-mounted on change so the CSS fade replays */}
        <div key={active} className="diagram__caption-body">
          <strong>{title(active)}</strong>
          <p className="muted">{t(`lucy.diagram.nodes.${active}.description`)}</p>
        </div>
        <p className="diagram__hint">{t('lucy.diagram.hint')}</p>
      </figcaption>
    </figure>
  );
};

export default LucyDiagram;
