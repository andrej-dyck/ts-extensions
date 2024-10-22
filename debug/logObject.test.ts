import { test } from 'vitest'
import { logObject } from './logObject.js'

test('logObject', () => {
  logObject({
    id: 'a1234',
    number: 10017,
    data: [
      { id: 1, name: 'foo', price: { cents: 170023 } },
      { id: 1, name: 'bar', price: { cents: 45231 } },
    ],
  })
})
