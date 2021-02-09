import _ from 'lodash'
import HasOne from '@/relations/HasOne.js'

export default function( Model, config)
{
  // Static
  Model.rpHasOne = function(related, foreignKey, localKey = null, opts = {})
  {
    return new HasOne(this, related, foreignKey, localKey, opts)
  }

  // Instance

}
