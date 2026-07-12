#!/usr/bin/env node

/**
 * Video Optimization Script
 * Converts hero.mp4 into multiple formats and qualities for adaptive delivery
 * 
 * Requirements:
 * - FFmpeg must be installed on your system
 * - For Windows: Download from https://ffmpeg.org/download.html or use: choco install ffmpeg
 * - For Mac: brew install ffmpeg
 * - For Linux: sudo apt-get install ffmpeg
 * 
 * Usage: node scripts/optimize-videos.js
 */

import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { promisify } from "util";

const execPromise = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SOURCE_VIDEO = path.join(PUBLIC_DIR, "hero.mp4");

const CONFIGS = [
  { format: "mp4", quality: "sd", width: 640, bitrate: 400 },    // Mobile Fallback
  { format: "mp4", quality: "md", width: 944, bitrate: 800 },    // Tablet Fallback
  { format: "webm", quality: "sd", width: 640, bitrate: 400 },   // Mobile WebM
  { format: "webm", quality: "md", width: 944, bitrate: 800 },   // Tablet WebM
  { format: "webm", quality: "hd", width: 944, bitrate: 1500 },  // Desktop WebM
];

async function checkFFmpeg() {
  try {
    const { stdout } = await execPromise("ffmpeg -version");
    console.log("✓ FFmpeg found\n");
    return true;
  } catch {
    console.error(
      "✗ FFmpeg not found. Install from: https://ffmpeg.org/download.html\n"
    );
    return false;
  }
}

function getConversionCommand(input, output, format, width, bitrate) {
  // Ensure height is divisible by 2 for H.264 compatibility
  const scale = `scale=${width}:trunc(ow/a/2)*2`;

  if (format === "webm") {
    // Add multi-threading and speed up encoding
    return `ffmpeg -i "${input}" -vf "${scale}" -c:v libvpx-vp9 -b:v ${bitrate}k -crf 30 -quality good -speed 4 -row-mt 1 -threads 8 -c:a libopus -b:a 96k -y "${output}"`;
  } else {
    // Use fast preset instead of slow to speed up MP4 encoding
    return `ffmpeg -i "${input}" -vf "${scale}" -c:v libx264 -preset fast -crf 23 -b:v ${bitrate}k -c:a aac -b:a 96k -y "${output}"`;
  }
}

async function convertVideo(format, quality, width, bitrate) {
  const output = path.join(PUBLIC_DIR, `hero-${quality}.${format}`);

  console.log(
    `Converting to ${quality} (${format.toUpperCase()}, ${width}p, ${bitrate}k)...`
  );

  try {
    const command = getConversionCommand(
      SOURCE_VIDEO,
      output,
      format,
      width,
      bitrate
    );
    await execPromise(command);

    const stats = fs.statSync(output);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(
      `✓ Created: hero-${quality}.${format} (${sizeMB}MB)\n`
    );
    return sizeMB;
  } catch (err) {
    console.error(`✗ Failed to create hero-${quality}.${format}`);
    console.error(`  Error: ${err.message}\n`);
    throw err;
  }
}

async function main() {
  console.log("🎬 Video Optimization Tool\n");
  console.log("================================\n");

  if (!fs.existsSync(SOURCE_VIDEO)) {
    console.error(`✗ Source video not found: ${SOURCE_VIDEO}`);
    process.exit(1);
  }

  const hasFFmpeg = await checkFFmpeg();
  if (!hasFFmpeg) {
    process.exit(1);
  }

  console.log("Starting conversion...\n");

  const originalStats = fs.statSync(SOURCE_VIDEO);
  const originalSizeMB = (originalStats.size / 1024 / 1024).toFixed(2);

  const results = [];

  for (const config of CONFIGS) {
    try {
      const size = await convertVideo(
        config.format,
        config.quality,
        config.width,
        config.bitrate
      );
      results.push({ ...config, size });
    } catch (err) {
      console.error(
        `Continuing despite error... (Missing ${config.quality})\n`
      );
    }
  }

  // Print summary
  console.log("================================");
  console.log("📊 OPTIMIZATION RESULTS\n");
  console.log(`Original hero.mp4: ${originalSizeMB}MB\n`);

  const deviceMap = {
    "sd-webm": "Mobile (WebM)",
    "md-webm": "Tablet (WebM)",
    "hd-webm": "Desktop (WebM)",
    "sd-mp4": "Mobile Fallback (MP4)",
    "md-mp4": "Tablet Fallback (MP4)",
  };

  for (const result of results) {
    const key = `${result.quality}-${result.format}`;
    const label = deviceMap[key] || `${result.quality} (${result.format})`;
    const savings = (
      ((originalSizeMB - result.size) / originalSizeMB) *
      100
    ).toFixed(1);
    console.log(
      `  ${label}: ${result.size}MB (↓${savings}% smaller)`
    );
  }

  console.log("\n✓ Optimization complete!");
  console.log(
    "\nNext steps:"
  );
  console.log(
    "1. Test the video by running: npm run dev"
  );
  console.log(
    "2. Update .gitignore to exclude optimized video files (optional)"
  );
  console.log(
    "3. Deploy to production!\n"
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
