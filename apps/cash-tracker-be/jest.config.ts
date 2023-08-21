import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/repositories/'],
  coverageProvider: 'babel',
  moduleDirectories: ['node_modules'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
}

export default config
