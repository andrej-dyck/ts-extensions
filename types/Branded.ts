/**
 * A branded type for compile-time safe usage of (primitive) values.
 *
 * Example usage:
 *   type Email = Branded<string, 'email'>
 *
 *   const validEmail = (email: string): Email | undefined =>
 *     emailRegex.test(email) ? email as Email : undefined
 *
 *   const subscribe = (email: Email) => {
 *     ...
 *   }
 *
 *   ...
 *
 *   ❌ subscribe('abc@mail.com') // ts-error
 *   ✅ const email = validEmail('abc@mail.com') ?? raise('invalid email')
 *      subscribe(email) // no ts-error
 */
export type Branded<T, B> = T & Brand<B>

type Brand<B> = { [__brand]: B }
declare const __brand: unique symbol
