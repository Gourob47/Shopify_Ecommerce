 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema } from "@ioc:Adonis/Core/Validator";
import Cart from 'App/Models/Cart';
export default class CartsController {
    public async store(ctx:HttpContextContract){
        
      

           const req = await ctx.request.validate({
            schema: schema.create({
              c:schema.number(),
              u:schema.number(),
              p:schema.number(),
              name:schema.string({})
            }),
         
          });

          const cart= new Cart();
          cart.productId=ctx.params.id;
          cart.combination= ctx.request.body().x+"/"+ctx.request.body().y+"/"+ctx.request.body().z;
          cart.quantity= req.c;
          cart.userId= ctx.auth.user?.id;
          cart.uniqueid=req.u;
          cart.price=req.p;
          cart.name=req.name;
          
          await cart.save();

        

    }


    public async getCart(ctx:HttpContextContract){
     
      const products= await Cart.query().where('user_id',ctx.auth.user?.id);
      return products;
    }

    public async deleteCart(ctx:HttpContextContract){


      const req = await ctx.request.validate({
        schema: schema.create({
           id: schema.number()
        }),
     
      });
     
      const products= await Cart.findOrFail(req.id);
      await products.delete();
    }
}
