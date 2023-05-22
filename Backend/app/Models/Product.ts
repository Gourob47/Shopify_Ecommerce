import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User';

import Cart from './Cart';
import Variant from './Variant';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public description: string;
 
  @column()
  public userId: number;

  @column()
  public category: string;

  @column()
  public image_url: string;

  @column()
  public price: number;



  @column.dateTime({ autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? value.toFormat('yyyy-MM-dd') : value
    },
  
  })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
  
  @hasMany(() => Cart)
  public cart: HasMany<typeof Cart>

  @hasMany(() => Variant)
  public variant: HasMany<typeof Variant>


}
