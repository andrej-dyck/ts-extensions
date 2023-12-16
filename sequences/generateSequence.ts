/**
 * Generates a (possibly infinite) sequence of values using a seed and a next function.
 * Stops when next() returns null or undefined.
 */
export function* generateSequence<T extends NonNullable<unknown>>(seed: T, next: (c: T) => T | undefined | null): Iterable<T> {
  let n: T | undefined | null = seed
  while (n != null) {
    yield n
    n = next(n)
  }
}

/*
 * Examples:
 *   const naturalNumbers = generateSequence(1, n => n + 1) // 1, 2, 3, 4, 5, ...
 *   const gameOfLife = generateSequence(board, b => b.applyRules(rules))
 */

/*
 * Can be used well with ImmutableJS Seq (https://immutable-js.com/#lazy-seq); e.g.,
 *   const odds = Seq(naturalNumbers).take(100).filter(n => n % 2 !== 0)
 *
 *   // or a constructor function
 *   const generateSeq = <T extends NonNullable<unknown>>(seed: T, next: (c: T) => T | undefined | null): Seq<number, T> =>
 *      Seq(generateSequence(seed, next))
 */
