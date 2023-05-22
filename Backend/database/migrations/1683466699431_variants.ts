import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'variants'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('key').nullable();
      table.string('value').nullable();
      table.bigint('quantity').nullable();
      table.bigint('uniqueid').nullable();
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      table
      .integer('product_id')
      .unsigned()
      .references('products.id')
      .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable();
      table.timestamp('updated_at', { useTz: true }).nullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
