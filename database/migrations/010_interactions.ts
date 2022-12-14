import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'interactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('report').notNullable().unsigned().references('id').inTable('reports')
      table.string('user_document').references('document').inTable('users')
      table.integer('interaction_type').references('id').inTable('interaction_types')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
