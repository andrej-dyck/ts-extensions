import { expect, test } from 'vitest'
import { lazy } from './index.js'

test('lazy remembers the value of its function', () => {
  const lazyValue = lazy(() => 1)

  expect(lazyValue()).toBe(1)
})

test('lazy executes its function only once', () => {
  let countExecutions = 0

  const lazyValue = lazy(() => {
    countExecutions++
    return 1
  })

  lazyValue()
  lazyValue()

  expect(countExecutions).toBe(1)
})

test('lazy does propagate exceptions on first use', () => {
  const lazyValue = lazy(() => {
    throw new Error()
  })

  expect(lazyValue).toThrowError()
})

test('lazy retries on exceptions', () => {
  let countExecutions = 0

  const lazyValue = lazy(() => {
    if (countExecutions === 0) {
      countExecutions++
      throw new Error()
    }
    return 1
  })

  expect(lazyValue).toThrowError()
  expect(lazyValue()).toBe(1)
})
