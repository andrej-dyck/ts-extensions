import type { Equal, Expect, NotEqual } from '@type-challenges/utils'
import { expect, test } from 'vitest'
import { raise } from '../raise/index.js'
import { Branded } from './Branded.ts'

/** branded numbers */
type Age = Branded<number, 'Age'>
type Year = Branded<number, 'Year'>

const validAge = (age: number): Age | undefined =>
  age >= 0 && age <= 125 ? age as Age : undefined

const birthYear = (age: Age, now: Date): Year =>
  now.getFullYear() - age as Year // it's incorrect, but sufficient for demo purpose

test('birthYear is compile-time safe', () => {
  const fiveYears = validAge(5) ?? raise('invalid age')
  expect(
    birthYear(fiveYears, new Date(2024, 4, 11))
  ).toBe(2019)
})

test('birthYear\'s argument is still just a number in JS', () => {
  expect(
    // @ts-expect-error argument must be Age
    birthYear(5, new Date(2024, 4, 11))
  ).toBe(2019)
})

const someAge = validAge(5) ?? raise('invalid age')
const someBirthYear = birthYear(someAge, new Date(2024, 4, 11))

// @ts-expect-error unused type as tests are compiler-based
type AgeTests = [
  Expect<Equal<typeof someAge, Age>>,
  Expect<NotEqual<typeof someAge, number>>,
  Expect<Equal<Parameters<typeof validAge>, [number]>>,
  Expect<Equal<Parameters<typeof birthYear>, [Age, Date]>>,
  Expect<Equal<typeof someBirthYear, Year>>,
  Expect<NotEqual<typeof someBirthYear, number>>,
]

/** branded string */
type Email = Branded<string, 'Email'>

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ // a simplified regex
const validEmail = (email: string): Email | undefined =>
  emailRegex.test(email) ? email as Email : undefined

const someEmail = validEmail('abc@mail.com') ?? raise('invalid email')

// @ts-expect-error unused type as tests are compiler-based
type EmailTests = [
  Expect<Equal<typeof someEmail, Email>>,
  Expect<NotEqual<typeof someEmail, string>>,
  Expect<Equal<Parameters<typeof validEmail>, [string]>>,
]
