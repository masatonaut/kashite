import { readFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const SVG_PATH = join(process.cwd(), "public/logos/kashite-icon.svg");
const OUTPUT_DIR = join(process.cwd(), "public/icons");

const sizes = [192, 512];

async function generateIcons() {
  const sharp = await import("sharp").then((m) => m.default);

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const svgBuffer = readFileSync(SVG_PATH);

  for (const size of sizes) {
    const outputPath = join(OUTPUT_DIR, `icon-${size}.png`);

    await sharp(svgBuffer).resize(size, size).png().toFile(outputPath);

    console.log(`Generated: ${outputPath}`);
  }

  console.log("Icon generation complete!");
}

generateIcons().catch((err) => {
  console.error("Failed to generate icons:", err);
  process.exit(1);
});
