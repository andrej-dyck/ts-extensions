import { expect, test } from 'vitest'
import { omitFields } from './omitFields.js'

test('omitFields omits a field from an object', () => {
  expect(omitFields({ a: 1, b: 2, c: 3 }, 'b')).toMatchObject({ a: 1, c: 3 })
})

test('omitFields omits multiple fields from an object', () => {
  expect(omitFields({ a: 1, b: 2, c: 3 }, 'b', 'c')).toMatchObject({ a: 1 })
})

test('omitFields returns same obj if no keys are specified', () => {
  const obj = { a: 1, b: 2, c: 3 }
  expect(omitFields(obj)).toBe(obj)
})
