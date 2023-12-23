import { describe, expect, test } from 'vitest'
import { typedEvents } from './TypedEvents.js'

describe('TypedEvents', () => {

  test('streams every emitted event', async () => {
    const te = typedEvents<string>()

    const { stream } = te.listen()
    const events = take(2)(stream())

    te.emit('hello')
    te.emit('world')

    expect(await events).toEqual(['hello', 'world'])
  })

  test('only receives events after stream has been opened', async () => {
    const te = typedEvents<string>()

    te.emit('this is not included')

    const { stream } = te.listen()
    const events = take(2)(stream())

    te.emit('hello')
    te.emit('world')

    expect(await events).toEqual(['hello', 'world'])
  })

  test('event stream can be aborted', async () => {
    const te = typedEvents<string>()

    const { stream, abort } = te.listen()
    const events = take(3)(stream())

    te.emit('hello')
    te.emit('world')
    abort()
    te.emit('this is not included')

    expect(await events).toEqual(['hello', 'world'])
  })

  test('event stream can be filtered', async () => {
    const te = typedEvents<{ id: number, message: string }>()

    const { stream } = te.listen({ filter: (e) => e.id === 1 })
    const events = take(2)(stream())

    te.emit({ id: 1, message: 'hello' })
    te.emit({ id: 2, message: 'hello' })
    te.emit({ id: 1, message: 'world' })

    expect((await events).map(e => e.message)).toEqual(['hello', 'world'])
  })

  test('event stream can be transformed', async () => {
    const te = typedEvents<string>()

    const { stream } = te.listen()
    const events = take(2)(stream(e => e.toUpperCase()))

    te.emit('hello')
    te.emit('world')

    expect((await events)).toEqual(['HELLO', 'WORLD'])
  })

  test('event stream is empty after an abort', async () => {
    const te = typedEvents<string>()

    const { stream, abort } = te.listen()
    stream()
    abort()
    const events = take(2)(stream())

    te.emit('hello')
    te.emit('world')

    expect(await events).toEqual([])
  })

  test('there can be two listeners for an event stream', async () => {
    const te = typedEvents<string>()

    const { stream: stream1, abort: abort1 } = te.listen()
    const { stream: stream2 } = te.listen()
    const events1 = take(3)(stream1())
    const events2 = take(3)(stream2())

    te.emit('hello')
    te.emit('world')
    abort1()
    te.emit('!')

    expect(await events1).toEqual(['hello', 'world'])
    expect(await events2).toEqual(['hello', 'world', '!'])
  })

})

const take = (count: number) => async <T>(asyncIterable: AsyncIterable<T>): Promise<T[]> => {
  if (count <= 0) return []

  const elements: T[] = []
  let i = 0
  for await (const element of asyncIterable) {
    elements.push(element)
    i++
    if (i >= count) break
  }
  return elements
}
