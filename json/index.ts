/**
 * Safely parse a json string. Result is either a non-nullable unknown or an error.
 */
export const safeJsonParse = <T extends NonNullable<unknown>>(
  value: string | undefined | null,
  parseUnknown?: (json: unknown) => T | never
): { success: true, output: T }
  | { success: false, error: unknown } => {
  try {
    const output = JSON.parse(value ?? '') // as unknown
    return output != null
      ? { success: true, output: parseUnknown?.(output) ?? output as T }
      : { success: false, error: 'null' }
  } catch (error: unknown) {
    return { success: false, error }
  }
}

/**
 * Safely parse a json string. Value is either a non-nullable unknown or undefined.
 */
export const maybeJson = <T extends NonNullable<unknown>>(
  value: string | undefined | null,
  parseUnknown?: (json: unknown) => T | never
): T | undefined => {
  const r = safeJsonParse(value, parseUnknown)
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
 *
 *   ✅ maybeJson('{ "data": { "id": "01" } }') // { data: { id: '01' } } of type unknown
 *   ❌ maybeJson('') // undefined
 *
 *   // using zod for parsing:
 *   ✅ maybeJson('{ "data": { "id": "01" } }', (o) => z.object({ data: z.object({ id: z.string() }) }).parse(o))
 *      // { data: { id: '01' } } of type { data: { id: string } }
 */
