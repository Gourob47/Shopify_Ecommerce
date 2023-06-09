import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').nullable();
      table.string('combination').nullable();
      table.bigint('price').nullable();
      table.bigint('quantity').nullable();
      table.bigint('total').nullable();
      table.bigint('uniqueid').nullable();
      table.string('status').nullable();
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      
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
