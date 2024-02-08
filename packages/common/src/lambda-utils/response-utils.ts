const ok = () => {
  return {
    statusCode: 202,
  }
}

const success = (body: object, contentType?: string) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
    headers: {
      'content-type': contentType || 'application/json',
    },
  }
}

export const Response = {
  ok,
  success,
}
