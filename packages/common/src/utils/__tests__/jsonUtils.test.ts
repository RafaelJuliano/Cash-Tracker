import { safeParse } from '../jsonUtils'

describe('Utils - JsonUtils', () => {
  describe('safeParse', () => {
    it('should parse a valid json', () => {
      expect(safeParse('{"theCakeIsALie": true}')).toStrictEqual({
        theCakeIsALie: true,
      })
    })

    it('should parse an invalid json', () => {
      expect(safeParse('{"theCakeIsALie": false"}')).toStrictEqual({})
    })
  })
})
