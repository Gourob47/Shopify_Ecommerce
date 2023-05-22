import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Product from './Product'
import Order from './Order'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

   
  @column()
  public name:string

  @column()
  public combination:string

  @column()
  public quantity:number

  @column()
  public uniqueid:number

  @column()
  public price:number

  @column()
  public userId:number

  @column()
  public productId:number




  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  
}
