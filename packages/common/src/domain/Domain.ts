export enum Domain {
  ACCOUNT_PAYABLE = 'ACCOUNT_PAYABLE',
  ACCOUNT_RECEIVALBE = 'ACCOUNT_RECEIVALBE',
  CUSTOMER = 'CUSTOMER'
}

export enum DomainPrefix {
  ACCOUNT_PAYABLE = 'accp',
  ACCOUNT_RECEIVALBE = 'accr',
  CUSTOMER = 'cust'
}

export type DomainId = {
  [Domain.ACCOUNT_PAYABLE]: `${DomainPrefix.ACCOUNT_PAYABLE}_${string}`
  [Domain.ACCOUNT_RECEIVALBE]: `${DomainPrefix.ACCOUNT_RECEIVALBE}_${string}`
  [Domain.CUSTOMER]: `${DomainPrefix.CUSTOMER}_${string}`
}