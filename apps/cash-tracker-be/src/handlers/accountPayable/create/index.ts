import { handlerPath } from '@cash-tracker/common'
import { ACCOUNTS_PAYABLE_BASE_URL } from '../../shared/constants'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 128,
  environment: {
    MONGO_DB_URI: '${ssm:/${self:provider.stage}/sls/mongodb/cash-tracker}',
    MONGO_DATABASE: 'cashtracker-${self:provider.stage}',
    ACCOUNTS_PAYABLES_COLLECTION: 'accounts-payables',
    X_API_KEY: '${ssm:/${self:provider.stage}/sls/cash-tracker/x-api-key}',
  },
  events: [
    {
      httpApi: {
        path: ACCOUNTS_PAYABLE_BASE_URL,
        method: 'POST',
      },
    },
  ],
}
