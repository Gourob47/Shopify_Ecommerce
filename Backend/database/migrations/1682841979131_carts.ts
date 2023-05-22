import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'carts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').nullable();
      table.string('combination').nullable();
      table.bigint('uniqueid').notNullable();
      table.bigint('quantity').nullable()
      table.bigint('price').nullable();
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      table
      .integer('product_id')
      .unsigned()
      .references('products.id')
      



      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
