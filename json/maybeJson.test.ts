import { expect, test } from 'vitest'
import { maybeJson } from './index.js'
import { z } from 'zod'

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
])('maybeJson can parse what JSON.parse can; %j', ({ input, expectedOutput }) => {
  expect(maybeJson(input)).toEqual(expectedOutput)
})

test.each([
  { input: '' },
  { input: 'null' },
  { input: 'undefined' },
  { input: '{' },
  { input: ']' },
  { input: '{ bar: foo }' },
  { input: '{ "bar": 1a }' },
])('maybeJson is undefined when JSON.parse fails; %j', ({ input }) => {
  expect(maybeJson(input)).toBeUndefined()
})

test('maybeJson accepts a parse function that further parses the unknown to a type', () => {
  const parsedObject = maybeJson(
    '{ "number": 1.07, "letters": ["a", "b", "c"] }',
    (o) => z.object({ letters: z.array(z.string()) }).parse(o) // with zod
  )
  expect(parsedObject?.letters).toEqual(['a', 'b', 'c'])
})

test('maybeJson is undefined if the parse function fails to parse the unknown', () => {
  const parsedObject = maybeJson(
    '{ "number": 1.07, "letters": [1, 2, 3] }',
    (o) => z.object({ letters: z.array(z.string()) }).parse(o)
  )
  expect(parsedObject).toBeUndefined()
})

test('maybeJson can assume that unknown is of type T without a parse function (not recommended)', () => {
  const parsedObject = maybeJson<{ letters: string[] }>(
    '{ "number": 1.07, "letters": ["a", "b", "c"] }'
  )
  expect(parsedObject?.letters).toEqual(['a', 'b', 'c'])
})
