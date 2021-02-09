import _ from 'lodash'
import axiosFilter from '@/filters/axios.js'
import parserFilter from '@/filters/parser.js'
import ormInsertFilter from '@/filters/orm-insert.js'
import relationsFilter from '@/filters/relations.js'
import pathHelper from '@/helpers/path.js'
import parserHelper from '@/helpers/parser.js'

export default async function update(path = null, keys = null, config = null)
{
  const
  conf = Object.assign({}, this.constructor.crud().config, config),
  axiosConf = axiosFilter(conf),
  parserConf = parserFilter(conf),
  ormInsertConf = ormInsertFilter(conf),
  relations = relationsFilter(conf)

  // check client
  const { put } = conf.client
  if(_.isUndefined(put)) throw new Error(`HTTP Client has no put method`)

  // request
  const data = this.pickKeys(keys?? Object.keys(this.$toJson()))
  const response = await put(pathHelper(path?? this.apiPath(), relations), data, axiosConf)

  // merge
  const values = Object.assign({}, data, parserHelper(response, parserConf))

  // don't save if save = false
  if(!ormInsertConf.save) return values;

  const stored = await this.$update(values)
  return stored
}
