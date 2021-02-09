import { Relation } from '@vuex-orm/core'

export default class HasOne extends Relation
{
  opts = {}
  related = null
  foreignKey = null
  localKey =  null

  constructor(model, related, foreignKey, localKey = null, opts = {})
  {
    super(model) /* istanbul ignore next */
    this.related = this.model.relation(related)
    this.foreignKey = foreignKey
    this.localKey = localKey
    this.opts = Object.assign(opts, this.opts)
  }

  define(schema)
  {
    return schema.one(this.related)
  }

  attach(key, record, data)
  {
    if (!record[this.localKey]) {
      record[this.localKey] = this.model.getIndexIdFromRecord(record)
    }
    const related = data[this.related.entity] && data[this.related.entity][key]

    if (related) {
      related[this.foreignKey] = record[this.localKey]
    }
  }

  make(value, _parent , _key )
  {
    return this.makeOneRelation(value, this.related)
  }

  makeOneRelation (record, model)
  {
    if (!this.isOneRelation(record))return null
    const relatedModel = model.getModelFromRecord(record) || model
    return new relatedModel(record)
  }

  load(query, collection, name, constraints)
  {
    console.log(constraints);
    const relation = this.getRelation(query, this.related.entity, constraints)
    this.addEagerConstraints(relation, collection)
    this.match(collection, relation.get(), name)
  }

  addEagerConstraints(relation, collection)
  {
    relation.whereFk(this.foreignKey, this.getKeys(collection, this.localKey))
  }

  match(collection,relations,name)
  {
    const dictionary = this.buildDictionary(relations)
    collection.forEach((model) => {
      const id = model[this.localKey]
      const relation = dictionary[id]
      model[name] = relation || null
    })
  }

  buildDictionary(relations)
  {
    return relations.reduce((dictionary, relation) =>
    {
      const key = relation[this.foreignKey]

      dictionary[key] = relation

      return dictionary
    }, {})
  }
}
