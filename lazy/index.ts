/**
 * A lazy function for typescript projects.
 */
export const lazy = <T>(create: () => T) => {
  let instance: T | undefined = undefined
  return (): T => instance ??= create()
}

/*
 * Example:
 *   const config = lazy(
 *     () => fs.readFileSync('config.json').then(f => cfgSchema.parse(f))
 *   )
 *
 *   config().PROP_1
 *   config().PROP_2 // config file is read and parsed only once
 */
