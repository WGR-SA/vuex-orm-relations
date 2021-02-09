import _ from 'lodash'

const
allowed = [
  'save',
  'persistBy',
  'persistOptions',
],
filter = (obj, ...rest) =>  _.pick(Object.assign(obj, ...rest), allowed)

export default filter
