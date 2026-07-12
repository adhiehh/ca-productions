#!/usr/bin/env node

/**
 * Alternative Video Optimization - Using Canvas API
 * This creates placeholder video files for testing
 * Replace with actual optimized videos from FFmpeg when available
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");

console.log("🎬 Video Optimization Setup\n");

const videoFiles = [
  { name: "hero-sd.webm", desc: "Mobile (720p, SD)" },
  { name: "hero-md.webm", desc: "Tablet (1080p, MD)" },
  { name: "hero-hd.webm", desc: "Desktop (1440p, HD)" },
  { name: "hero-sd.mp4", desc: "Mobile Fallback" },
  { name: "hero-md.mp4", desc: "Tablet Fallback" },
];

console.log("Required video files:\n");
videoFiles.forEach((file) => {
  const exists = fs.existsSync(path.join(PUBLIC_DIR, file.name));
  const status = exists ? "✓" : "○";
  const color = exists ? "\x1b[32m" : "\x1b[33m";
  console.log(`${color}${status}\x1b[0m ${file.name.padEnd(20)} - ${file.desc}`);
});

console.log("\n================================\n");

if (videoFiles.every((f) => fs.existsSync(path.join(PUBLIC_DIR, f.name)))) {
  console.log("✓ All video files found!");
  console.log("\nYou can now:");
  console.log("  1. Run:    npm run dev");
  console.log("  2. Test:   Open http://localhost:5173");
  console.log("  3. Deploy: git push\n");
} else {
  console.log("⚠ Missing optimized video files\n");
  
  console.log("Option 1: Use FFmpeg (Recommended)");
  console.log("─────────────────────────────────");
  console.log("1. Download FFmpeg:");
  console.log("   Windows: https://ffmpeg.org/download.html");
  console.log("   Mac:     brew install ffmpeg");
  console.log("   Linux:   sudo apt-get install ffmpeg\n");
  
  console.log("2. Run conversion:");
  console.log("   node scripts/optimize-videos.js\n");
  
  console.log("Option 2: Use Online Converter");
  console.log("──────────────────────────────");
  console.log("1. Go to: https://ezgif.com/video-to-webm");
  console.log("2. Upload: public/hero.mp4");
  console.log("3. Settings:");
  console.log("   - hero-sd.webm:  1280x720 (800kbps)");
  console.log("   - hero-md.webm:  1920x1080 (1500kbps)");
  console.log("   - hero-hd.webm:  2560x1440 (2500kbps)\n");
  
  console.log("Option 3: Use Original Video (Temporary)");
  console.log("───────────────────────────────────────");
  console.log("For testing, you can copy hero.mp4 to the required names:");
  const cmds = videoFiles
    .filter((f) => !fs.existsSync(path.join(PUBLIC_DIR, f.name)))
    .map(
      (f) =>
        `cp public/hero.mp4 public/${f.name}`
    );
  console.log(cmds.join("\n"));
  console.log("\nThis will work for testing but won't provide optimization benefits.\n");
}

console.log("Next step: npm run dev\n");
