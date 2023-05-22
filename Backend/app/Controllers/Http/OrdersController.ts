 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { schema } from "@ioc:Adonis/Core/Validator";
import Cart from 'App/Models/Cart';
import Order from 'App/Models/Order';
import Variant from 'App/Models/Variant';
export default class OrdersController {
    public async store(ctx:HttpContextContract){

        const req = await ctx.request.validate({
            schema: schema.create({
              name:schema.string({}),
              price:schema.number(),
              quantity:schema.number(),
              id:schema.number(),
              uniqueid:schema.number(),
              total:schema.number(),
              combination:schema.string({})
            }),
         
          });
        const order= await Order.create({
            name: req.name,
            price:req.price,
            quantity:req.quantity,
            userId:ctx.auth.user?.id,
            total:req.total,
            uniqueid:req.uniqueid,
            combination:req.combination,
            status:"pending",        
        })
        if(order)
        {
            await Variant.query().where('uniqueid',req.uniqueid).decrement('quantity',req.quantity)
            const cart= await Cart.findOrFail(req.id);
            await cart.delete();              
        }
        return order;
    }
    public async getOrder(ctx:HttpContextContract){
         const order= await Order.query().where('user_id',ctx.auth.user?.id);
         return order;
    }
}
