import { readdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";

const currentModuleDir = dirname(new URL(import.meta.url).pathname);
const imagesFolderPath = join(currentModuleDir, "images");

function generateImageData() {
  const imageFiles = readdirSync(imagesFolderPath);
  const imageData = imageFiles
    .filter(
      (img) =>
        !img.startsWith("Screenshot") &&
        (img.endsWith(".png") || img.endsWith(".jpg"))
    )
    .map((filename, index) => {
      const name = filename.split(".")[0].split("_")[1];
      return { filename, name };
    });

  const jsonData = JSON.stringify(imageData, null, 2);

  writeFileSync(join(currentModuleDir, "images.json"), jsonData);
}

generateImageData();
