export class Resource {
  createRole(resource: string, arnKey: string, actions: string[]) {
    return {
      Effect: 'Allow',
      Resource: [
        {
          'Fn::Join': [
            '',
            [
              `arn:aws:${resource}`,
              ':',
              { Ref: 'AWS::Region' },
              ':',
              { Ref: 'AWS::AccountId' },
              ':',
              arnKey,
            ],
          ],
        },
      ],
      Action: actions,
    }
  }
}
