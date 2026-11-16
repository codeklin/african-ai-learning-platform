export interface ExchangeRateResponse {
  result?: unknown
  base_code?: unknown
  rates?: unknown
  time_last_update_utc?: unknown
}

export const FALLBACK_USD_NGN_RATE = 1600

export async function getUsdNgnRate(): Promise<{ rate: number; updatedAt: string }> {
  const response = await fetch('https://open.er-api.com/v6/latest/USD', {
    next: { revalidate: 86400 },
    signal: AbortSignal.timeout(3000),
  })

  if (!response.ok) {
    throw new Error(`Exchange-rate service returned ${response.status}`)
  }

  const data = (await response.json()) as ExchangeRateResponse
  const rates =
    data.rates && typeof data.rates === 'object'
      ? (data.rates as Record<string, unknown>)
      : null
  const rate = rates?.NGN
  const updatedAt = data.time_last_update_utc

  if (
    data.result !== 'success' ||
    data.base_code !== 'USD' ||
    typeof rate !== 'number' ||
    !Number.isFinite(rate) ||
    rate <= 0 ||
    typeof updatedAt !== 'string' ||
    !Number.isFinite(Date.parse(updatedAt))
  ) {
    throw new Error('Exchange-rate response did not contain a valid USD/NGN rate')
  }

  return { rate, updatedAt }
}

export async function getUsdNgnRateWithFallback(): Promise<{ rate: number; updatedAt: string }> {
  const fallback = {
    rate: FALLBACK_USD_NGN_RATE,
    updatedAt: new Date().toISOString(),
  }

  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const fallbackTimer = new Promise<{ rate: number; updatedAt: string }>((resolve) => {
    timeoutId = setTimeout(() => resolve(fallback), 1500)
  })

  try {
    const liveRate = await Promise.race([
      getUsdNgnRate().catch((error) => {
        console.error('Unable to fetch live USD/NGN rate; using fallback instead:', error)
        return fallback
      }),
      fallbackTimer,
    ])

    return liveRate
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }
}
