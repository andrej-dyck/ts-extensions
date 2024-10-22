export const logObject = (obj: unknown) =>
  console.dir(obj, { depth: Infinity, colors: true, numericSeparator: true })
