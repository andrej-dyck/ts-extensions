/**
 * Returns a function that will memoize the return values for arguments of (pure) function f and return those on subsequent calls.
 * Note that it only supports functions with exactly 1 argument and the values must be equatable (e.g., objects won't work)
 */
export const memoize = <T, R>(f: (arg: T) => R): (arg: T) => R => {
  const values = new Map<T, R>()
  return (arg: T) => {
    if(!values.has(arg)) {
      values.set(arg, f(arg))
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return values.get(arg)!
  }
}
