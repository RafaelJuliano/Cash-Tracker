const ok = () => {
  return {
    statusCode: 200
  }
}

const success = (body: object) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
  }
}

export const Response = {
  ok,
  success
}