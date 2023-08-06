import { Resource } from './Resource'

export class Ssm extends Resource {
  private ssmKeys = ['mongodb/cash-tracker']

  private resource = 'ssm'

  private composeArnKey(ssmKey: string) {
    return `parameter/\${self:provider.stage}/sls/${ssmKey}`
  }

  public getAllRoles() {
    return this.ssmKeys.map(ssmKey =>
      this.createRole(this.resource, this.composeArnKey(ssmKey), ['ssm:GetParameter']),
    )
  }
}