import { describe, expect, test } from 'vitest'
import { groupBy } from './groupBy.ts'

describe('array groupBy', () => {

  test('empty array', () => {
    expect(groupBy([], () => 'p')).toEqual({})
  })

  test('selecting to same property', () => {
    expect(groupBy([1, 2, 3], () => 'p')).toEqual({
      p: [1, 2, 3],
    })
  })

  test('group array of objects by property key', () => {
    expect(
      groupBy(
        [{ id: '1', value: 1 }, { id: '2', value: 2 }, { id: '1', value: 3 }],
        (item) => item.id
      )
    ).toEqual({
      1: [{ id: '1', value: 1 }, { id: '1', value: 3 }],
      2: [{ id: '2', value: 2 }],
    })
  })
})
