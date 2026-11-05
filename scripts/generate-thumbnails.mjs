import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const srcDir = path.join(rootDir, "public", "images", "photography");
const outDir = path.join(rootDir, "public", "thumbs", "images", "photography");

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".JPG",
  ".JPEG",
  ".PNG",
]);

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      const ext = path.extname(file);
      if (IMAGE_EXTENSIONS.has(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  }

  return arrayOfFiles;
}

async function generateThumbnails() {
  const startTime = Date.now();
  console.log("🔍 Scanning photography images for thumbnails...");

  const files = getAllFiles(srcDir);
  console.log(`Found ${files.length} photography images.`);

  let createdCount = 0;
  let cachedCount = 0;
  let errorCount = 0;

  for (const filePath of files) {
    const relativePath = path.relative(srcDir, filePath);
    const parsed = path.parse(relativePath);
    const targetSubDir = path.join(outDir, parsed.dir);
    const targetFile = path.join(targetSubDir, `${parsed.name}.webp`);

    try {
      // 增量检查：如果目标缩略图已存在且修改时间晚于原图，则跳过
      if (fs.existsSync(targetFile)) {
        const srcStat = fs.statSync(filePath);
        const targetStat = fs.statSync(targetFile);
        if (targetStat.mtimeMs >= srcStat.mtimeMs) {
          cachedCount++;
          continue;
        }
      }

      fs.mkdirSync(targetSubDir, { recursive: true });

      await sharp(filePath)
        .rotate() // 依据 EXIF 自动校正旋转方向
        .resize({
          width: 480,
          withoutEnlargement: true,
        })
        .webp({ quality: 78 })
        .toFile(targetFile);

      createdCount++;
    } catch (err) {
      console.error(`Failed to process ${filePath}:`, err.message);
      errorCount++;
    }
  }

  const duration = Date.now() - startTime;
  console.log(
    `✅ Thumbnails complete in ${duration}ms! (Created: ${createdCount}, Cached: ${cachedCount}, Errors: ${errorCount})`
  );
}

generateThumbnails();
