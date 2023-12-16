/**
 * Checks if the given object has the specified field.
 */
export const hasField = <P extends PropertyKey>(obj: unknown, key: P): obj is Record<P, unknown> =>
  obj != null && typeof obj === 'object' && key in obj

/*
 * Example:
 *   const obj: { data: unknown } | { error: string } | unknown = ...
 *   hasField(obj, 'data')
 *     ? JSON.stringify(obj.data) // inferred that the data field exists
 *     : obj?.error // inferred that it's nullable or has error field
 */
