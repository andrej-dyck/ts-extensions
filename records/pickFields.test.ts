import { expect, test } from 'vitest'
import { pickFields } from './pickFields.js'

test('pickFields picks a field from an object', () => {
  expect(pickFields({ a: 1, b: 2, c: 3 }, 'b')).toMatchObject({ b: 2 })
})

test('pickFields picks multiple fields from an object', () => {
  expect(pickFields({ a: 1, b: 2, c: 3 }, 'a', 'b')).toMatchObject({ a: 1, b: 2 })
})

test('pickFields returns same obj if no keys are specified', () => {
  const obj = { a: 1, b: 2, c: 3 }
  expect(pickFields(obj)).toBe(obj)
})
