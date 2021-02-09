import _ from 'lodash'

const
allowed = [
  'dataKey',
  'paginationKey',
  'dataTransformer',
  'filter',
],
filter = (obj, ...rest) =>  _.pick(Object.assign(obj, ...rest), allowed)

export default filter
