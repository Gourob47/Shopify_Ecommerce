import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from "@ioc:Adonis/Core/Drive";
import Product from 'App/Models/Product';

import Application from '@ioc:Adonis/Core/Application'
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import Variant from 'App/Models/Variant';
import { DateTime } from 'luxon';
import Database from '@ioc:Adonis/Lucid/Database';
import User from 'App/Models/User';

export default class ProductsController {



   
    public async store(ctx: HttpContextContract){   
      
      console.log(ctx.request.body());

      const ans= JSON.parse(ctx.request.body().size);
      const req = await ctx.request.validate({
        schema: schema.create({
          name:schema.string({
          
          },[
          ]
          ),
          description: schema.string({}),
          category: schema.string({}),
        
          image: schema.file({
            size: '5mb',
            extnames: ['jpg', 'png', 'jpeg', 'svg'],
          }),
          price:schema.number()
        }),
        messages: {
          "name.required": "name field is required",
          "description.required": "description field is required",
          
        },
      });
      const imageName = new Date().getTime().toString() + `.${req.image.extname}`
      await req.image.move(Application.publicPath('images'), {
        name: imageName
      })
      const product= await Variant.query().increment('uniqueid',0);
       const post =await Product.create({
         name: req.name,
         description:req.description,
         image_url:`images/${imageName}`,
         category:req.category,
         userId:ctx.auth.user?.id,
         price:req.price
       })

      if(post)
      {
            ans.map(async(item,index)=>{
                await Variant.create({
                key:'size',
                value:item.size,
                quantity:item.quantity,
               
                userId:ctx.auth.user?.id,
                productId: post.id,
                uniqueid: product[0]+index,
               })
              await Variant.create({
                key:'color',
                value:item.color,
              
                quantity:item.quantity,
             
                userId:ctx.auth.user?.id,
                productId: post.id,
                uniqueid: product[0]+index,
               })
               await Variant.create({
                key:'model',
                value:item.extra,
                
                quantity:item.quantity,
              
                userId:ctx.auth.user?.id,
                productId: post.id,
                uniqueid:product[0]+index,
               })
            })
       
      }
      return post;
    }

    public async showCategory(ctx:HttpContextContract){
         const category= await Product.query().groupBy('category')
         return category; 
    }


    public async get(ctx:HttpContextContract){
      console.log(ctx.params.id);
       const post= await Product.query().where('category',ctx.params.id).preload('variant',
        (query)=>query.where('key','size').distinct('value')
       )
       return post;

    }
       
     
    
  public async details(ctx:HttpContextContract){
  
      const post= await Product.query().where('id',ctx.params.id).preload('variant');
      return post;  
   }




   public async filter(ctx:HttpContextContract){
   
    const value= ['L','XL'];
 

  
  
    //  const product= await Product.query().whereHas('variant',query=>{
    //      query.whereIn('value',value);
    //  })
   // const product= await Product.query().where('created_at')

    // const dates = await Database.from('products')
    // .select(Database.raw('DATE(created_at) AS date')).groupBy('created_at')

    //const product = await Product.findOrFail(1);
   // product.serialize();

   const posts = await Product
  .query()
  .preload('variant')

const postsJSON = posts.map((post) => post.serialize())


   
   
    return postsJSON;















  //  for(const i in size)
  //  {
  //   const product= await Variant.query().where('value',size[i]).groupBy('product_id');
  //   console.log(product);
 
  //   product && product.map((item,index)=>{

  //        set.add(item.productId);
  //   })

  //  }

  //   set.forEach(ele=>{
  //     arr.push(ele);
    
  //   })

  //   for(const i in arr)
  //   { 
  //     const product= await Product.query().where('id',arr[i]).first();
  //     item.push(product);

  //   }

  //   return item;

      // const product= await Product.query().intersect((query)=>{
    //   query.preload('variant', (query1)=>{
    //     query1.select('value').whereIn('value',value)
    //   })
    // },true)

  
   
 }
}
