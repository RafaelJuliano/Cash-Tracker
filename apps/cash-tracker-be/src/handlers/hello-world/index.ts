import { handlerPath } from '@cash-tracker/common'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 128,
  environment: {
    MONGO_DB_URI: '${ssm:/${self:provider.stage}/sls/mongodb/cash-tracker}',
    MONGO_DATABASE: 'cashtracker-${self:provider.stage}',
  },
  events: [
    {
      httpApi: {
        path: '/hello-world',
        method: 'GET',
      },
    },
  ],
}
