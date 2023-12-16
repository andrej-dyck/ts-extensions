/**
 * Picks specific fields from an object and returns a copy with only those fields.
 */
export const pickFields = <T extends Record<PropertyKey, unknown>, P extends keyof T>(obj: T, ...keys: P[]): Pick<T, P> => {
  if (keys.length === 0) return obj

  const copy = {} as Pick<T, P>
  for (const k of keys) {
    copy[k] = obj[k]
  }
  return copy
}

/*
 * Example:
 *   const order = { id: ..., date: ..., customer: ..., status: ..., items: [...] }
 *   const result = pickFields(order, 'id', 'date') // { id: ..., date: ... }
 */
