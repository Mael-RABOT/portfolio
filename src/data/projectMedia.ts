import type { Image } from './types';

/**
 * Project screenshots and short loops, picked up automatically:
 *
 *   src/assets/projects/<project-id>/NN-some-name.(webp|avif|png|jpg|jpeg|webm|mp4)
 *
 * Files are shown in name order (hence the NN- prefix). The alt text is derived from the
 * name ("02-control-panel" -> "Control panel"), or set per file with the project's `mediaAlt`.
 * Living in src/ (not public/), the files get hashed, long-cacheable URLs.
 */
const files = import.meta.glob<string>('../assets/projects/*/*.{webp,avif,png,jpg,jpeg,webm,mp4}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const VIDEO = /\.(webm|mp4)$/i;

const altFromName = (name: string) => {
  const words = name.replace(/^\d+[-_]?/, '').replace(/[-_]+/g, ' ').trim();
  return words ? words[0].toUpperCase() + words.slice(1) : '';
};

const byProject = new Map<string, Array<Image & { name: string }>>();
for (const path of Object.keys(files).sort()) {
  const [, id, file] = path.match(/projects\/([^/]+)\/([^/]+)$/) ?? [];
  if (!id || !file) continue;
  const name = file.replace(/\.[^.]+$/, '');
  const list = byProject.get(id) ?? [];
  list.push({ url: files[path], name, alt: altFromName(name), kind: VIDEO.test(file) ? 'video' : 'image' });
  byProject.set(id, list);
}

/** Media of a project, with `mediaAlt` overrides applied */
export const projectMedia = (id: string, mediaAlt?: Record<string, string>): Image[] =>
  (byProject.get(id) ?? []).map(({ name, ...media }) => ({ ...media, alt: mediaAlt?.[name] ?? media.alt }));
