import Link from 'next/link'

/**
 * Africa continent silhouette — inline SVG.
 * Used as the brand mark icon prefix.
 */
export function AfricaIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.2)}
      viewBox="0 0 100 120"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M38 4C30 4 22 8 18 14C14 20 12 28 10 36C8 44 6 50 8 58C10 64 14 68 14 74C14 80 10 86 12 92C14 98 20 102 26 106C32 110 40 112 46 110C52 108 56 102 60 98C64 94 70 92 74 88C78 84 80 78 82 72C84 66 86 60 86 54C86 46 82 40 80 34C78 28 78 22 74 16C70 10 62 4 54 4Z" />
      <ellipse cx="90" cy="68" rx="5" ry="10" />
    </svg>
  )
}

interface BrandProps {
  href?: string
  className?: string
}

/**
 * ituwaAfrica brand mark.
 * Africa icon + "ituwa" wordmark + "Africa" in accent colour.
 */
export default function Brand({ href = '/', className }: BrandProps) {
  return (
    <Link
      href={href}
      className={`brand${className ? ` ${className}` : ''}`}
      aria-label="ituwaAfrica home"
    >
      <span className="brand-mark brand-mark--africa">
        <AfricaIcon size={13} />
      </span>
      <span>ituwa<span className="brand-africa">Africa</span></span>
    </Link>
  )
}
