/**
 * Partial<T>, but recursive for records.
 */
export type DeepPartial<T> =
  T extends Record<PropertyKey, unknown>
    ? { [P in keyof T]?: DeepPartial<T[P]> }
    : T

/*
 * Example:
 *   type Contact = {
 *     id: string,
 *     email: string,
 *     address: {
 *       street: string
 *       city: string
 *     }
 *   }
 *
 *   type Inputs = DeepPartial<Omit<Contact, 'id'>>
 *   // type: {
 *        email?: string | undefined
 *        address?: {
 *          street?: string | undefined
 *          city?: string | undefined
 *        } | undefined
 *      }
 */
