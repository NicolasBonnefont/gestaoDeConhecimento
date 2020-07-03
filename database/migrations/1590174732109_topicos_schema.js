'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TopicosSchema extends Schema {
  up () {
    this.create('topicos', (table) => {
      table.increments()
      table.string('Titulo')
      table.string('Descricao')
      table.timestamps()
    })
  }

  down () {
    this.drop('topicos')
  }
}

module.exports = TopicosSchema
