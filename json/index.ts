/**
 * Safely parse a json string. Result is either a non-nullable unknown or an error.
 */
export const safeJsonParse = (value: string | undefined | null):
  { success: true, output: NonNullable<unknown> }
  | { success: false, error: unknown } => {
  try {
    const output = JSON.parse(value ?? '')// as unknown
    return output != null ? { success: true, output } : { success: false, error: 'null' }
  } catch (error: unknown) {
    return { success: false, error }
  }
}

/**
 * Safely parse a json string. Value is either a non-nullable unknown or undefined.
 */
export const maybeJsonParse = (value: string | undefined | null): NonNullable<unknown> | undefined => {
  const r = safeJsonParse(value)
  return r.success ? r.output : undefined
}

/*
 * Examples:
 *   ✅ safeJsonParse('{}') // { success: true, output: {} }
 *   ✅ safeJsonParse('{ "data": { "id": "01" } }') // { success: true, output: { data: { id: '01' } } }
 *   ✅ safeJsonParse('[1, 2, 3]') // { success: true, output: [1, 2, 3] }
 *   ❌ safeJsonParse('{ bar: foo }') // { success: false, error: ... }
 *   ❌ safeJsonParse('') // { success: false, error: ... }
 *   ❌ safeJsonParse('null') // { success: false, error: ... }
 */
