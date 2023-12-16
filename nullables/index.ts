/**
 * Checks whenever a value is not nullable; same as value != null
 *
 * Useful for Array.filter():
 *   const arr: (string | undefined)[] = [...]
 *   ❌ arr.filter(v => v != null) // type: (string | undefined)[]
 *   ❌ arr.filter(v => typeof v === 'string') // type: (string | undefined)[]
 *   ✅ arr.filter(isNonNullable) // type: string[]
 */
export const isNonNullable = <T>(value: NonNullable<T> | undefined | null): value is NonNullable<T> =>
  value != null
