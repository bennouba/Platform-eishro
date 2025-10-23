// Image resizing script for ESHRO platform slider images
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SLIDER_SPECS: Configuration for slider image dimensions
// Configuration for slider images - larger size for better display at all zoom levels
const SLIDER_SPECS = [
  { width: 600, height: 400 }, // Slider 1
  { width: 600, height: 400 }, // Slider 2
  { width: 600, height: 400 }, // Slider 3
  { width: 600, height: 400 }  // Slider 4
];
const QUALITY = 85;

// Source and destination directories
const sourceDir = './temp-images'; // Where the attached images are placed
const destDir = './public/assets/sheirine';

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Ensure source directory exists
if (!fs.existsSync(sourceDir)) {
  fs.mkdirSync(sourceDir, { recursive: true });
  console.log(`Created ${sourceDir} directory. Please place your 4 slider images there.`);
  process.exit(0);
}

// Get all image files from source directory
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const imageFiles = fs.readdirSync(sourceDir)
  .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
  .sort(); // Sort to ensure consistent naming

if (imageFiles.length === 0) {
  console.log(`No image files found in ${sourceDir}. Please place your 4 slider images there.`);
  process.exit(0);
}

if (imageFiles.length !== 4) {
  console.log(`Found ${imageFiles.length} images. Expected 4 images for the slider.`);
  process.exit(1);
}

console.log(`Found ${imageFiles.length} images. Resizing for slider...`);

async function resizeImages() {
  for (let i = 0; i < imageFiles.length && i < SLIDER_SPECS.length; i++) {
    const inputPath = path.join(sourceDir, imageFiles[i]);
    const outputPath = path.join(destDir, `slider${i + 1}.jpg`);
    const spec = SLIDER_SPECS[i];

    try {
      await sharp(inputPath)
        .resize(spec.width, spec.height, {
          fit: 'inside',
          withoutEnlargement: false // Allow upscaling if needed
        })
        .jpeg({ quality: QUALITY })
        .toFile(outputPath);

      console.log(`✓ Resized ${imageFiles[i]} -> slider${i + 1}.jpg (${spec.width}x${spec.height})`);
    } catch (error) {
      console.error(`✗ Error resizing ${imageFiles[i]}:`, error.message);
    }
  }

  console.log('\n🎉 All images resized successfully!');
  console.log(`Images saved to: ${destDir}`);
  console.log('Target dimensions:');
  SLIDER_SPECS.forEach((spec, i) => {
    console.log(`  Slider ${i + 1}: ${spec.width}x${spec.height}`);
  });
  console.log('\nYou can now delete the temp-images folder.');
}

resizeImages().catch(console.error);