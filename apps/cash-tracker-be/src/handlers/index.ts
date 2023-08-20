import helloWorld from './hello-world'
import accountPayable from './accountPayable'

export default {
  'hello-world': helloWorld,
  ...accountPayable,
}
