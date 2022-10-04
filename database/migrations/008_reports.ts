import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reports'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('type').notNullable().unsigned().references('id').inTable('report_types')
      table.boolean('attended')
      table.string('address')
      table.text('reference')
      table.decimal('latitude', 10, 8).notNullable()
      table.decimal('longitude', 11, 8).notNullable()
      table.text('description')
      table.string('email')
      table.text('images')
      table.string('user_document')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
