export const safeParse = (json: string): object => {
  try {
    return JSON.parse(json)
  } catch (error) {
    return {}
  }
}
