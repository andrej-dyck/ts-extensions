import { describe, expect, it, test } from 'vitest'
import { localeNumber, Locale } from './localeNumber.ts'

describe('localeNumber', () => {

  const numbers = [
    0, 1, 1.1, -1, 0.5, -17.42, 2001, 2777227.19, 9007199254740991, -9007199254740991,
  ]

  test.each(numbers)('parses numbers in German format; %j', (number) => {
    const locale = 'de-DE'
    const formattedNumber = Intl.NumberFormat(locale).format(number)
    expect(localeNumber(locale)(formattedNumber)).toBe(number)
  })

  test.each(numbers)('parses numbers in Invariant Country format; %j', (number) => {
    const locale = 'us-US' as unknown as Locale
    const formattedNumber = Intl.NumberFormat(locale).format(number)
    expect(localeNumber(locale)(formattedNumber)).toBe(number)
  })

  test.each(numbers)('parses numbers in French format; %j', (number) => {
    const locale = 'fr-FR' as unknown as Locale
    const formattedNumber = Intl.NumberFormat(locale).format(number)
    expect(localeNumber(locale)(formattedNumber)).toBe(number)
  })

  test.each(numbers)('parses numbers in Switzerland format; %j', (number) => {
    const locale = 'de-CH' as unknown as Locale
    const formattedNumber = Intl.NumberFormat(locale).format(number)
    expect(localeNumber(locale)(formattedNumber)).toBe(number)
  })

  test.each(numbers)('parses numbers in Kyrgyzstan format; %j', (number) => {
    const locale = 'ky-KG' as unknown as Locale
    const formattedNumber = Intl.NumberFormat(locale).format(number)
    expect(localeNumber(locale)(formattedNumber)).toBe(number)
  })

  test.each(numbers)('parses numbers in Estonia format; %j', (number) => {
    const locale = 'et-EE' as unknown as Locale
    const formattedNumber = Intl.NumberFormat(locale).format(number)
    expect(localeNumber(locale)(formattedNumber)).toBe(number)
  })

  it.each([
    '1 000 172,3', '1,000,172.30',
  ])('is undefined when number is formatted in a different locale; %j', (value) => {
    expect(localeNumber('de-DE')(value)).toBeUndefined()
  })

  it.each([
    '', 'NaN', 'Infinity', 'null', 'abc',
  ])('is undefined for non-numbers; %j', (value) => {
    expect(localeNumber('de-DE')(value)).toBeUndefined()
  })
})
