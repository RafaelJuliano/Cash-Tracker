import type { AWS } from '@serverless/typescript'
import functions from './src/handlers'
import { Ssm } from './infra'

const ssm = new Ssm()

const serverlessConfiguration: AWS = {
  service: 'cash-tracker-be',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-offline-ssm'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: '${opt:stage, "local"}',
    region: 'us-east-1',
    environment: {
      ENV: '${self:provider.stage}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [...ssm.getAllRoles()],
      },
    },
  },
  functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['@aws-sdk/client-lambda'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline-ssm': {
      stages: ['local'],
      ssm: {
        '/local/sls/mongodb/cash-tracker':
          'mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority',
        '/local/sls/cash-tracker/x-api-key': 'abcde12345',
      },
    },
  },
}

module.exports = serverlessConfiguration
