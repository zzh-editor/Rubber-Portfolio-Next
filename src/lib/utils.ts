export { cn } from "./cn";

/**
 * 将摄影原图路径映射为轻量 480px WebP 缩略图路径
 * 仅用于网格卡片与胶卷缩略图展示；大图灯箱使用高清原图
 */
export function getThumbSrc(originalSrc: string): string {
  if (!originalSrc || typeof originalSrc !== "string") return originalSrc;
  if (!originalSrc.startsWith("/images/photography/")) return originalSrc;

  return originalSrc
    .replace(/^\/images\/photography\//, "/thumbs/images/photography/")
    .replace(/\.(jpe?g|png|webp|JPG|JPEG|PNG)$/i, ".webp");
}

