'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

interface YouTubeEmbedProps {
  videoId: string
  title: string
  duration?: string | null
}

/**
 * Accessible, privacy-enhanced YouTube embed.
 *
 * Rules:
 * - Uses youtube-nocookie.com — no tracking cookies until the user clicks play
 * - Click-to-load pattern: shows a poster thumbnail first, only injects the
 *   iframe when the user deliberately presses Play — saves bandwidth for
 *   learners on mobile data
 * - Never autoplays
 * - Provides a visible, keyboard-focusable play button with proper aria labels
 * - Only rendered for authenticated users (enforced by the parent server component)
 */
export default function YouTubeEmbed({ videoId, title, duration }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false)
  const posterUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  const embedUrl  = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`

  return (
    <div className="yt-wrap" role="region" aria-label={`Video: ${title}`}>
      {!loaded ? (
        <button
          className="yt-poster"
          onClick={() => setLoaded(true)}
          aria-label={`Play video: ${title}`}
          type="button"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterUrl}
            alt={`Thumbnail for: ${title}`}
            className="yt-poster-img"
            loading="lazy"
            onError={(e) => {
              // Fall back to hqdefault if maxresdefault doesn't exist
              const img = e.currentTarget
              if (img.src.includes('maxresdefault')) {
                img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
              }
            }}
          />
          <span className="yt-play-btn" aria-hidden="true">
            <Play size={28} fill="currentColor" />
          </span>
          {duration && (
            <span className="yt-duration" aria-label={`Duration: ${duration}`}>
              {duration}
            </span>
          )}
          <span className="yt-label">Watch on ituwaAfrica · YouTube</span>
        </button>
      ) : (
        <iframe
          className="yt-iframe"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  )
}
