import { expect, expectTypeOf, test } from 'vitest'
import { raise } from '../raise/index.js'
import { Branded } from './Branded.ts'

/** branded numbers */
type Age = Branded<number, 'Age'>
type Year = Branded<number, 'Year'>

const validAge = (age: number): Age | undefined =>
  age >= 0 && age <= 125 ? age as Age : undefined

const birthYear = (age: Age, now: Date): Year =>
  now.getFullYear() - age as Year // this is incorrect, but sufficient for demo purpose

test('Age is compile-time save', () => {
  const someAge = validAge(5) ?? raise('invalid age')

  expectTypeOf(someAge).toEqualTypeOf<Age>()
  expectTypeOf(someAge).not.toEqualTypeOf<number>()
})

test('birthYear is compile-time safe', () => {
  const fiveYears = validAge(5) ?? raise('invalid age')

  expectTypeOf(birthYear).parameters.toMatchTypeOf<[Age, Date]>()

  const twothousandnineteen = birthYear(fiveYears, new Date(2024, 4, 11))
  expect(twothousandnineteen).toBe(2019)

  expectTypeOf(twothousandnineteen).toEqualTypeOf<Year>()
  expectTypeOf(twothousandnineteen).not.toEqualTypeOf<number>()
})

test('birthYear\'s argument is still just a number in JS', () => {
  expect(
    // @ts-expect-error argument must be Age
    birthYear(5, new Date(2024, 4, 11))
  ).toBe(2019)
})
