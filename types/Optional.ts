/**
 * Makes some properties of a record optional.
 */
export type Optional<T, K extends keyof Record<PropertyKey, unknown>> = Omit<T, K> & { [K in keyof T]?: T[K] }

/*
 * Example:
 *   type CartItem = {
 *     id: string,
 *     sku: string,
 *     quantity: number,
 *   }
 *
 *   function addItem(item: Optional<CartItem, 'id' | 'quantity'>) {
 *     // typeof item: { id?: string, sku: string, quantity?: number }
 *     ...
 *   }
 */
