import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DateTime } from 'luxon'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('document').primary()
      table.string('document_type')
      table.string('name')
      table.string('last_name')
      table.string('email').unique()
      table.string('phone')
      table.string('password')
      table.integer('rol').unsigned().notNullable().references('id').inTable('roles')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
