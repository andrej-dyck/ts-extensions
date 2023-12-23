import { EventEmitter } from 'node:events'
import * as crypto from 'crypto'
import { on } from 'events'

export type TypedEvents = ReturnType<typeof typedEvents>

/**
 * A type-safe way to use EventEmitter
 */
export const typedEvents = <
  TEvent extends NonNullable<unknown>
>(options?: {
  eventEmitter?: EventEmitter,
  eventName?: string | symbol
}) => {
  const eventEmitter = options?.eventEmitter ?? new EventEmitter()
  const eventName = options?.eventName ?? crypto.randomUUID()

  const emit = (event: TEvent) => eventEmitter.emit(eventName, event)

  const listen = (options?: {
    filter?: (e: TEvent) => boolean,
    onAbort?: (reason?: string) => void,
    onError?: (e: unknown) => void,
  }) => {
    const ac = new AbortController

    const abort = (reason?: string) => ac.abort(reason)
    ac.signal.onabort = () => options?.onAbort?.(typeof ac.signal.reason === 'string' ? ac.signal.reason : undefined)

    const stream = async function* <R = TEvent>(transform?: (e: TEvent) => R): AsyncIterable<R> {
      try {
        for await (const [event] of on(eventEmitter, eventName.toString(), { signal: ac.signal })) {
          const typedEvent = event as unknown as TEvent
          if (options?.filter?.(typedEvent) ?? true) {
            yield transform?.(typedEvent) ?? typedEvent as unknown as R
          }
        }
      } catch (e: unknown) {
        if (!(isAbortError(e))) {
          if (typeof options?.onError === 'function') options.onError(e)
          else throw e
        }
      }
    }

    return { stream, abort }
  }

  return { emit, listen }
}

const isAbortError = (e: unknown) =>
  e && typeof e === 'object' && 'name' in e && e.name === 'AbortError'

/*
 * Example:
 *   const te = typedEvents<{ id: number, message: string }>()
 *
 *   function sse(request: Request, reply: Reply) {
 *     const { stream, abort } = te.listen({ filter: (e) => e.id === request.params.id }) // listen with filter
 *
 *     request.socket.on('close', () => abort('connection closed')) // abort on connection close
 *     reply.sse(stream((e) => ({ data: JSON.stringify(e) })) // stream transformed events using SSE
 *   }
 *
 *   // another part of your system
 *   te.emit({ id: 17, message: 'Hello' })
 *   te.emit({ id: 17, message: 'World' })
 */
