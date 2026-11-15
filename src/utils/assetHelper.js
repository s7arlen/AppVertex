/**
 * Universal Asset URL resolver for AppVertex
 * Ensures public assets resolve properly both in local dev ('/')
 * and on GitHub Pages subpaths ('/AppVertex/').
 */
export function assetUrl(path) {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  if (base !== '/' && path.startsWith(cleanBase)) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}

export default assetUrl;
