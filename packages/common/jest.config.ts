import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'babel',
  moduleDirectories: ['node_modules'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
}

export default config
