import { NonEmptyArray } from '../types/index.js'

export type Grouping<T> = Record<PropertyKey, NonEmptyArray<T>>

/**
 * Groups an array of items by a property-key
 * Example:
 *  groupBy(
 *    [{ id: "1", value: 1 },{ id: "2", value: 2 },{ id: "1", value: 3 }],
 *    (item) => item.id
 *  ) === {
 *    1: [{ id: "1", value: 1 },{ id: "1", value: 3 }],
 *    2: [{ id: "2", value: 2 }]
 *  }
 */
export const groupBy = <T>(array: readonly T[], keySelector: (item: T) => PropertyKey): Grouping<T> =>
  array.reduce<Grouping<T>>((group, item) => {
    const key = keySelector(item)
    return {
      ...group,
      [key]: group[key] == null ? <NonEmptyArray<T>>[item] : <NonEmptyArray<T>>[...group[key], item],
    }
  }, {})
