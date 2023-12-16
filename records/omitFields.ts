/**
 * Omits specified fields from an object and returns a copy without those fields.
 */
export const omitFields = <T extends Record<PropertyKey, unknown>, P extends keyof T>(obj: T, ...keys: P[]): Omit<T, P> => {
  if (keys.length === 0) return obj

  const copy = { ...obj }
  for (const k of keys) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete copy[k]
  }
  return copy
}

/*
 * Example:
 *   const order = { id: ..., date: ..., customer: ..., status: ..., items: [...] }
 *   const result = omitFields(order, 'customer', 'status') // { id: ..., date: ..., items: [...] }
 */
