import { expect, test } from 'vitest'
import { maybeJsonParse } from './index.js'

test.each([
  { input: '{}', expectedOutput: {} },
  { input: '{ "number": 1.07 }', expectedOutput: { number: 1.07 } },
  { input: '{ "string": "abc" }', expectedOutput: { string: 'abc' } },
  { input: '{ "boolean": true }', expectedOutput: { boolean: true } },
  { input: '{ "nested": { "string": "abc" } }', expectedOutput: { nested: { string: 'abc' } } },
  { input: '[]', expectedOutput: [] },
  { input: '[1, 2, 3]', expectedOutput: [1, 2, 3] },
  { input: '""', expectedOutput: '' },
  { input: '1.07', expectedOutput: 1.07 },
  { input: 'true', expectedOutput: true },
])('can parse what JSON.parse can; %j', ({ input, expectedOutput }) => {
  expect(maybeJsonParse(input)).toEqual(expectedOutput)
})

test.each([
  { input: '' },
  { input: 'null' },
  { input: 'undefined' },
  { input: '{' },
  { input: ']' },
  { input: '{ bar: foo }' },
  { input: '{ "bar": 1a }' },
])('is undefined when JSON.parse fails; %j', ({ input }) => {
  expect(maybeJsonParse(input)).toBeUndefined()
})
