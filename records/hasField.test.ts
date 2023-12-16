import { expect, test } from 'vitest'
import { hasField } from './hasField.js'

test('hasField infers that a field exists on an unknown object', () => {
  const obj: unknown = { id: 1 }
  expect(hasField(obj, 'id') ? obj.id : 0).toBe(1)
})

test.each([
  { obj: { a: 1 }, key: 'a', expected: true },
  { obj: { a: 1 }, key: 'b', expected: false },
  { obj: {}, key: 'a', expected: false },
  { obj: undefined, key: 'a', expected: false },
])('hasField checks that a field exists on an unknown object', ({ obj, key, expected }) => {
  expect(hasField(obj, key)).toBe(expected)
})
