const REDIRECT_ORIGIN = 'https://ituwa.invalid'

export function getSafeRedirectPath(value: string | null | undefined, fallback = '/courses'): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return fallback
  }

  try {
    const url = new URL(value, REDIRECT_ORIGIN)
    if (url.origin !== REDIRECT_ORIGIN) return fallback
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return fallback
  }
}
