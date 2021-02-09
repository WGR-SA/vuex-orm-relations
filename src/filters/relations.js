import _ from 'lodash'

const
allowed = [
  'relations',
],
filter = (obj, ...rest) => _.pick(Object.assign(obj, ...rest), allowed).relations

export default filter
