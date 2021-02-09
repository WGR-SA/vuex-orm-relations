import _ from 'lodash'

export default function parser(response, parserConf, Service = null)
{
  // pagination
  if(Service && parserConf.paginationKey && response.data[parserConf.paginationKey])
  {
    let pagination = response.data[parserConf.paginationKey]
    Service.pagination = pagination
  }

  // records
  let records

  // custom dataTransformer or dataKey !
  if (parserConf.dataTransformer) records = parserConf.dataTransformer(this.response)
  else records = parserConf.dataKey? response.data[parserConf.dataKey]: response.data

  //apply filter : )
  if(parserConf.filter && Array.isArray(records)) records = records.filter(parserConf.filter)

  // return result !
  return records
}
