import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Cart from './Cart'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public combination: string

  @column()
  public price: number

  @column()
  public quantity: number

  @column()
  public uniqueid: number

  @column()
  public total: number

  @column()
  public status: string

  
  @column()
  public userId: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => User)
  public user: BelongsTo<typeof User>


}
