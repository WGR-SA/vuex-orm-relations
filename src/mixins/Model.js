import _ from 'lodash'
import apiPathMethod from '@/methods/api-path'
import deleteMethod from '@/methods/delete'
import saveMethod from '@/methods/save'
import updateMethod from '@/methods/update'
import pickKeysMethod from '@/methods/pick-keys'
import Service from '@/Service.js'

const services = {}

export default function( Model, config)
{
  // Static
  Model.crud = function()
  {
    if(!services[this.name]) services[this.name] = new Service(this, config)
    return services[this.name]
  }

  // Instance
  Model.prototype.apiPath = apiPathMethod
  Model.prototype.delete = deleteMethod
  Model.prototype.save = saveMethod
  Model.prototype.update = updateMethod
  Model.prototype.pickKeys = pickKeysMethod

  // Static Magic api path
  Model._apiPath = null
  Object.defineProperty(Model, 'apiPath',
  {
    get: function() { return this._apiPath?? _.kebabCase(this.entity) },
    set : function(path) { this._apiPath = path }
  })
}
