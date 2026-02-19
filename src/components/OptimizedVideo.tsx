import { VideoHTMLAttributes } from 'react';

interface OptimizedVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'> {
  src: string; // Video path (.webm or .mp4)
  alt?: string;
  className?: string;
}

/**
 * Video component with fallback support
 * Automatically loops, muted, and plays inline
 */
export function OptimizedVideo({ src, alt, className, ...props }: OptimizedVideoProps) {
  const baseFilename = src.substring(0, src.lastIndexOf('.'));

  const webmSrc = `${baseFilename}.webm`;
  const mp4Src = `${baseFilename}.mp4`;

  return (
    <video
      className={className}
      autoPlay
      loop
      muted
      playsInline
      {...props}
      aria-label={alt}
    >
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
