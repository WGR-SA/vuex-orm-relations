import _ from 'lodash'
import axiosFilter from '@/filters/axios.js'
import parserFilter from '@/filters/parser.js'
import ormInsertFilter from '@/filters/orm-insert.js'
import relationsFilter from '@/filters/relations.js'
import pathHelper from '@/helpers/path.js'
import parserHelper from '@/helpers/parser.js'

export default async function get(Service, path = null, config = null)
{
  // filter stuff
  const
  conf = Object.assign({}, Service.config, config),
  axiosConf = axiosFilter(conf),
  parserConf = parserFilter(conf),
  ormInsertConf = ormInsertFilter(conf),
  relations = relationsFilter(conf)

  // check client
  const { get } = conf.client
  if(_.isUndefined(get)) throw new Error(`HTTP Client has no get method`)

  // request
  const response = await get(pathHelper(path?? Service.model.apiPath, relations), axiosConf)
  const records = parserHelper(response, parserConf, Service)

  // don't save if save = false
  if(!ormInsertConf.save) return records;

  // persistOptions
  let storeObject = {data: records}
  if(ormInsertConf.persistOptions) storeObject.persistOptions = ormInsertConf.persistOptions

  // switch method persistBy
  Service.model[ormInsertConf.persistBy](storeObject)

  return records;
}
