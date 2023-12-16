import { expect, test } from 'vitest'
import { generateSequence } from './index.js'

test('generateSequence has only seed when next is null', () => {
  expect([...generateSequence(1, () => null)]).toEqual([1])
})

test('generateSequence has only seed when next is undefined', () => {
  expect([...generateSequence(1, () => undefined)]).toEqual([1])
})

test('generateSequence builds a sequence until next returns nullish value', () => {
  expect([...generateSequence(1, n => n < 10 ? n + 1 : null)]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('generateSequence is lazy', () => {
  const seq = generateSequence(1, n => {
    if (n < 10) return n + 1
    throw new Error()
  })

  expect([...take(3)(seq)]).toEqual([1, 2, 3])
})

const take = (n: number) => function* <T>(iterable: Iterable<T>): Iterable<T> {
  if (n > 0) {
    let i = 1
    for (const element of iterable) {
      yield element
      if (++i > n) break
    }
  }
}
