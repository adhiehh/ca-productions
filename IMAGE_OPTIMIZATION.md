# 📸 Image Management Guide

## Best Practices for Wedding Photography Site

### 1️⃣ **Image Format & Compression**

**Use WebP format** for best quality-to-size ratio:

- **Modern browsers**: 25-35% smaller than JPEG
- **Fallback**: Always keep JPEG versions

**Recommended specs:**

- **Gallery images**: 1920x1280px @ 85% quality
- **Cover images**: 2560x1440px @ 90% quality
- **Max file size**: 300-500KB per image

### 2️⃣ **Prepare Images Before Upload**

#### Using ImageMagick (command line):

```bash
# Compress JPEG (85% quality)
magick input.jpg -quality 85 output.jpg

# Convert to WebP
magick input.jpg -quality 85 output.webp

# Batch convert folder
for img in *.jpg; do magick "$img" -quality 85 -resize 1920x1280\> "output_${img}"; done
```

#### Using Online Tools:

- **TinyJPG/TinyPNG**: tinyjpg.com (drag & drop, batch upload)
- **Squoosh**: squoosh.app (Google's image optimizer, live preview)
- **ImageOptim**: imageoptim.com (Mac, one-click batch)

### 3️⃣ **Upload Folder Structure**

```
src/assets/projects/
├── muskan-faizan/          # Project folder
│   ├── 001.jpg             # Name: number-based (auto-sorts)
│   ├── 002.jpg
│   ├── 003.jpg
│   └── ...
├── anamika-shirin/
│   ├── 001.jpg
│   ├── 002.jpg
│   └── ...
```

**Why numbers?** Auto-sorts alphabetically = you control display order!

### 4️⃣ **Upload Workflow**

1. **Prepare images locally:**

   ```bash
   # On your machine - compress before upload
   magick wedding-photo.jpg -quality 85 -resize 1920x1280\> compressed.jpg
   ```

2. **Add to Git:**

   ```bash
   cd lumina-studio
   cp compressed.jpg src/assets/projects/muskan-faizan/001.jpg
   git add src/assets/projects/
   git commit -m "Add wedding photos for Muskan & Faizan project"
   git push
   ```

3. **Deploy to Vercel:**
   - Automatic deploy on push
   - Vercel caches & serves optimized images
   - No extra config needed!

### 5️⃣ **Vercel Image Optimization** (Automatic on deploy)

When you deploy to Vercel:

- ✅ Automatic WebP conversion
- ✅ Responsive image serving (right size for device)
- ✅ CDN caching (lightning fast)
- ✅ AVIF format for new browsers
- ✅ Blur-up placeholders (optional)

**Free tier**: 1,000 image optimizations/day (more than enough!)

### 6️⃣ **Quick Reference: File Sizes**

| Format   | Size       | Quality   | Use Case              |
| -------- | ---------- | --------- | --------------------- |
| Original | 5-8MB      | 100%      | Never use             |
| JPEG 90% | 800-1200KB | Excellent | Don't use (too large) |
| JPEG 85% | 300-500KB  | Excellent | ✅ Use this           |
| WebP 85% | 200-350KB  | Excellent | ✅ Best option        |

### 7️⃣ **Gallery Best Practices**

- **Per project**: 8-15 photos (don't overwhelm)
- **Aspect ratios**: Mix portrait (4:3) and landscape (16:9)
- **Lead with best**: Strongest photo should be first (#1)
- **Variety**: Include details, moments, couples, venue

### 8️⃣ **Troubleshooting**

**Images not showing?**

- Check folder path: `src/assets/projects/{slug}/`
- Verify file extensions: .jpg, .jpeg, .png, .webp (lowercase!)
- Restart dev server: `npm run dev`

**Build failing?**

- Ensure no spaces in filenames: `photo 1.jpg` → `photo-1.jpg`
- No special characters: `photo&video.jpg` ❌
- Use: numbers or hyphens only

**Images too large?**

- Compress again using TinyJPG or ImageMagick
- Aim for 300-500KB per image
- Test locally before commit

### 9️⃣ **Batch Download & Compress Script**

Save as `optimize-images.sh`:

```bash
#!/bin/bash
# Compress all JPGs in current folder to WebP

for file in *.jpg; do
  magick "$file" -quality 85 -resize 1920x1280\> "${file%.jpg}.webp"
  magick "$file" -quality 85 -resize 1920x1280\> "compressed_${file}"
done

echo "Done! Move compressed files to src/assets/projects/{project}/"
```

Run:

```bash
chmod +x optimize-images.sh
./optimize-images.sh
```

---

## 🚀 Quick Start Example

**Adding Muskan & Faizan wedding photos:**

```bash
# 1. Compress photos locally
magick raw-photo-1.jpg -quality 85 -resize 1920x1280\> 001.jpg
magick raw-photo-2.jpg -quality 85 -resize 1920x1280\> 002.jpg

# 2. Move to project folder
mkdir -p src/assets/projects/muskan-faizan
mv 001.jpg 002.jpg src/assets/projects/muskan-faizan/

# 3. Commit & push
git add src/assets/projects/muskan-faizan/
git commit -m "Add wedding photos for Muskan & Faizan"
git push

# 4. Watch it deploy to Vercel automatically! 🎉
```

Visit `https://your-domain.vercel.app/projects/muskan-faizan` → images automatically load!

---

**Questions?** The gallery auto-detects new images, so:

1. Add images → folder
2. Commit → Git
3. Push → Deployed
4. Visit → Photos live! ✨
