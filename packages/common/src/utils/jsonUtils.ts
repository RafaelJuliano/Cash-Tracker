export const safeParse = (json: string | object): object => {
  try {
    if (typeof json === 'object') {
      return json
    }
    return JSON.parse(json)
  } catch (error) {
    return {}
  }
}
