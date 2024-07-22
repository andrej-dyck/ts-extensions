import { expectTypeOf, test } from 'vitest'
import { raise } from '../raise/index.js'
import { Branded } from './Branded.js'

/** branded string */
type Email = Branded<string, 'Email'>

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ // a simplified regex
const validEmail = (email: string): Email | undefined =>
  emailRegex.test(email) ? email as Email : undefined

test('Email is compile-time save', () => {
  const someEmail = validEmail('abc@mail.com') ?? raise('invalid email')

  expectTypeOf(someEmail).toEqualTypeOf<Email>()
  expectTypeOf(someEmail).not.toEqualTypeOf<string>()
})
