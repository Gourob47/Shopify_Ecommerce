import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Hash from "@ioc:Adonis/Core/Hash";
import Product from './Product';

import Cart from './Cart';
import Order from './Order';
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public username: string;


  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column()
  public role: string;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }


  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasMany(() => Cart)
  public cart: HasMany<typeof Cart>

  @hasMany(() => Order)
  public orders: HasMany<typeof Order>
}
