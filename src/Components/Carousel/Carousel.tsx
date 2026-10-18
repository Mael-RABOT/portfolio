import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Image } from '../../data/types';
import { FadeImage } from '../Motion/FadeImage';
import { useReducedMotion } from '../Motion/useReducedMotion';
import './Carousel.css';

const SWIPE_THRESHOLD = 48; // px of horizontal drag that turns into a slide change

/** Screenshot, or a short muted loop that only plays while its slide is shown (controls instead with reduced motion) */
const Slide: React.FC<{ media: Image; alt: string; active: boolean }> = ({ media, alt, active }) => {
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (active && !reduce) el.play().catch(() => {});
    else el.pause();
  }, [active, reduce]);

  if (media.kind !== 'video') return <FadeImage src={media.url} alt={alt} draggable={false} />;
  return (
    <video ref={video} src={media.url} aria-label={alt} muted loop playsInline preload="metadata" controls={reduce} />
  );
};

interface CarouselProps {
  items: Image[];
  /** Accessible name of the whole carousel, e.g. "Screenshots of Lucy" */
  label: string;
  /** Fallback alt text for an item without one (index from 1) */
  altFor: (index: number) => string;
}

/**
 * One media at a time in a fixed 16:9 frame (no layout shift), with previous / next buttons,
 * a counter and one segment per item. Arrow keys and swipes work too; it wraps around at both ends.
 */
export const Carousel: React.FC<CarouselProps> = ({ items, label, altFor }) => {
  const { t } = useTranslation('navigation');
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState<number | null>(null);
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const count = items.length;

  // a new set of items (another project) starts from the first one
  useEffect(() => setIndex(0), [items]);

  if (count === 0) return null;
  const go = (next: number) => setIndex(((next % count) + count) % count);
  const pad = (n: number) => String(n).padStart(2, '0');

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(index - 1);
    else if (e.key === 'ArrowRight') go(index + 1);
    else return;
    e.preventDefault();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (count < 2 || (e.pointerType === 'mouse' && e.button !== 0)) return;
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    // mostly vertical: let the page scroll
    if (drag === null && Math.abs(e.clientY - s.y) > Math.abs(dx)) {
      start.current = null;
      return;
    }
    if (drag === null && Math.abs(dx) < 6) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag(dx);
  };
  const onPointerEnd = () => {
    if (drag !== null && Math.abs(drag) > SWIPE_THRESHOLD) go(index + (drag < 0 ? 1 : -1));
    start.current = null;
    setDrag(null);
  };

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        className={`carousel__viewport chamfer ${count > 1 ? 'is-draggable' : ''}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div
          className={`carousel__track ${drag !== null ? 'is-dragging' : ''}`}
          style={{ transform: `translateX(calc(${-index * 100}% + ${drag ?? 0}px))` }}
        >
          {items.map((media, i) => (
            <div
              key={media.url}
              className="carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={t('carousel.slide', { index: i + 1, count })}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              <Slide media={media} alt={media.alt || altFor(i + 1)} active={i === index} />
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="carousel__controls">
          <button type="button" className="carousel__arrow" onClick={() => go(index - 1)} aria-label={t('carousel.prev')}>
            <span aria-hidden="true">←</span>
          </button>
          <span className="carousel__counter" aria-live="polite">
            <span className="carousel__current">{pad(index + 1)}</span> / {pad(count)}
          </span>
          <button type="button" className="carousel__arrow" onClick={() => go(index + 1)} aria-label={t('carousel.next')}>
            <span aria-hidden="true">→</span>
          </button>
          <ol className="carousel__segments">
            {items.map((media, i) => (
              <li key={media.url}>
                <button
                  type="button"
                  className={`carousel__segment ${i === index ? 'is-active' : ''}`}
                  onClick={() => go(i)}
                  aria-label={t('carousel.goTo', { index: i + 1 })}
                  aria-current={i === index ? 'true' : undefined}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};
