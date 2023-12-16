/**
 * Raises an error with the given reason.
 */
export const raise = (reason: string): never => {
  throw new Error(reason)
}

/*
 * Example:
 *   const url = process.env.API_URL ?? raise('API_URL not defined')
 */
