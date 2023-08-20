import { handlerPath } from '@cash-tracker/common'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 128,
  environment: {
    MONGO_DB_URI: '${ssm:/${self:provider.stage}/sls/mongodb/cash-tracker}',
    MONGO_DATABASE: 'cashtracker-${self:provider.stage}',
    X_API_KEY: '${ssm:/${self:provider.stage}/sls/cash-tracker/x-api-key}',
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
