/* eslint-disable @typescript-eslint/no-non-null-assertion */

export type Locale = string // todo: ideally 'de-DE' | 'us-US' | 'fr-FR' | ...

/**
 * Parses number formatted as a local string (must still consist of 0-9 digits)
 * using Intl.NumberFormat(locale) to determine decimal and group separators
 */
export const localeNumber = (locale: Locale) => (number: string): number | undefined => {
  if (number.length === 0) return undefined

  const { decimal, group, minusSign } = cachedSeparators(locale)
  const parsed = Number(
    number.replace(minusSign, '-').replaceAll(group, '').replaceAll(decimal, '.')
  )
  return Number.isFinite(parsed) ? parsed : undefined
}

/*
 * Example:
 *   const germanNumber = localeNumber('de-DE')
 *   const n = germanNumber('-2.777.227,19') // -> -2777227.19
 */

type LocaleSeparators = { locale: Locale, decimal: string, group: string, minusSign: string }

const localeSeparators = (locale: Locale): LocaleSeparators => {
  const parts = new Intl.NumberFormat(locale).formatToParts(-10000.1)
  return {
    locale,
    decimal: parts.find(p => p.type === 'decimal')!.value,
    group: parts.find(p => p.type === 'group')!.value,
    minusSign: parts.find(p => p.type === 'minusSign')!.value,
  }
}

const cachedSeparators = (locale: Locale): LocaleSeparators =>
  separators.get(locale) ?? separators.set(locale, localeSeparators(locale)).get(locale)!

const separators = new Map<Locale, LocaleSeparators>()
