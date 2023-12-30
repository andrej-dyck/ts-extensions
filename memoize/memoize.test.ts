import { describe, expect, test } from 'vitest'
import { memoize } from './index.js'

describe('memoize', () => {

  test('delegates to function of first call', () => {
    const mf = memoize((n: number) => n * 2)
    expect(mf(2)).toEqual(4)
  })

  test('uses memoized return value on subsequent calls', () => {
    let calls = 0
    const mf = memoize((n: number) => {
      calls++
      return n * 2
    })

    expect(mf(2)).toEqual(4)
    expect(mf(2)).toEqual(4)
    expect(calls).toEqual(1)
  })

  test('memorizes return value pre argument', () => {
    let calls = 0
    const mf = memoize((n: number) => {
      calls++
      return n * 2
    })

    expect(mf(2)).toEqual(4)
    expect(mf(2)).toEqual(4)

    expect(mf(1)).toEqual(2)
    expect(mf(1)).toEqual(2)

    expect(calls).toEqual(2)
  })
})
