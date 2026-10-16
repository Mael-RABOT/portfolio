import React, { useCallback, useState } from 'react';

/**
 * `<img>` that fades in once decoded (see `.fade-img` in App.css).
 * Lazy-loaded and decoded off the main thread; cached images show immediately.
 */
export const FadeImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className = '', onLoad, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <img
      ref={ref}
      loading="lazy"
      decoding="async"
      {...props}
      className={`fade-img ${loaded ? 'is-loaded' : ''} ${className}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
};
