/**
 * Video Quality Detection Utilities
 * Determines optimal video quality based on device and network conditions
 */

export type VideoQuality = "sd" | "md" | "hd";

/**
 * Detects screen size and returns appropriate video quality
 * - Mobile (<768px): SD (720p)
 * - Tablet (768-1024px): MD (1080p)
 * - Desktop (1024px+): HD (1440p+)
 */
export function getVideoQualityByScreen(): VideoQuality {
  if (typeof window === "undefined") return "hd";
  
  const width = window.innerWidth;
  if (width < 768) return "sd";   // Mobile
  if (width < 1024) return "md";  // Tablet
  return "hd";                    // Desktop
}

/**
 * Detects network speed and returns appropriate video quality
 * Uses Network Information API if available
 */
export function getVideoQualityByNetwork(): VideoQuality {
  if (typeof navigator === "undefined") return "hd";
  
  const connection = (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;
  
  if (!connection) return "hd";
  
  const effectiveType = connection.effectiveType;
  switch (effectiveType) {
    case "slow-2g":
    case "2g":
      return "sd"; // Low bandwidth: SD quality
    case "3g":
      return "md"; // Medium bandwidth: MD quality
    case "4g":
    default:
      return "hd"; // Fast connection: HD quality
  }
}

/**
 * Determines optimal video quality considering both screen and network
 * Uses the lower quality of the two to balance quality and performance
 */
export function getOptimalVideoQuality(): VideoQuality {
  const screenQuality = getVideoQualityByScreen();
  const networkQuality = getVideoQualityByNetwork();
  
  // Map qualities to numeric values for comparison
  const qualityMap: Record<VideoQuality, number> = {
    sd: 1,
    md: 2,
    hd: 3,
  };
  
  // Return the lower quality
  return qualityMap[screenQuality] < qualityMap[networkQuality]
    ? screenQuality
    : networkQuality;
}

/**
 * Gets the video source URL based on quality
 * Prefers WebM format for better compression, falls back to MP4
 */
export function getVideoSource(quality: VideoQuality): { webm: string; mp4?: string } {
  const sources: Record<VideoQuality, { webm: string; mp4?: string }> = {
    sd: {
      webm: "/hero-sd.webm",
      mp4: "/hero-sd.mp4",
    },
    md: {
      webm: "/hero-md.webm",
      mp4: "/hero-md.mp4",
    },
    hd: {
      webm: "/hero-hd.webm",
      mp4: "/hero.mp4", // Fallback to original for HD
    },
  };
  
  return sources[quality];
}

/**
 * Detects if browser supports WebM video format
 */
export function supportsWebM(): boolean {
  if (typeof document === "undefined") return false;
  
  const video = document.createElement("video");
  return !!(video.canPlayType && video.canPlayType('video/webm; codecs="vp9"'));
}
