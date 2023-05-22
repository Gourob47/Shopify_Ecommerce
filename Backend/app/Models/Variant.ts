import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Variant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public key: string

  @column()
  public value: string

  @column()
  public quantity: number

  @column()
  public uniqueid: number

  @column()
  public userId: number

  @column()
  public productId: number

  public serializeExtras = true

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
}
