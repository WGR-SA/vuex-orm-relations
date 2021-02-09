import _ from 'lodash'
import joinPath from 'path.join'

export default function createPath(path, relations = [])
{

  if(relations.length)
  {
    let prefix = _.reduce(relations, (result, rel) => joinPath(result, rel.apiPath()), '');
    path = joinPath(prefix, path)
  }

  return path;
}
