import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'roles_resources_permissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('rol_id').unsigned().notNullable().references('id').inTable('roles')
      table.integer('permission_id').unsigned().notNullable().references('id').inTable('permissions')
      table.integer('resource_id').unsigned().notNullable().references('id').inTable('resources')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
