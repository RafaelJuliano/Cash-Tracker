import { handlerPath } from '@cash-tracker/common'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 128,
  events: [
    {
      httpApi: {
        path: '/hello-world',
        method: 'GET',
      },
    },
  ],
}
