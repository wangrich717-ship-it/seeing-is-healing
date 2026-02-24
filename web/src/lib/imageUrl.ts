/** GitHub Pages 等子路径部署时的前缀，本地开发为空 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * 将图片路径加上 basePath，用于在子路径部署时正确加载图片
 */
export function imageUrl(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return basePath + p;
}
