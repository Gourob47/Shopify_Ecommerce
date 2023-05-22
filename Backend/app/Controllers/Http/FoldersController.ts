 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Folder from 'App/Models/Folder'
import { rules, schema } from "@ioc:Adonis/Core/Validator";
export default class FoldersController {
   
    public async store(ctx:HttpContextContract){


    const  foldername=ctx.request.body().foldername;
     const key= ctx.request.body().key;
     const path=(ctx.request.body().pa);
 
        const folder= await Folder.create({
            foldername:foldername,
            key:key,
            path:path,
        })
        return folder;
    }


    public async get(ctx:HttpContextContract){
 
        const s=ctx.params.key;
        const folder= await Folder.query().where('key',s).preload('files');  
        return folder;
       


     
       
    }

    public async edit(ctx:HttpContextContract){
        const req = await ctx.request.validate({
            schema: schema.create({
             
              foldername:schema.string({})
            }),
         
          });

        const folder= await Folder.findOrFail(ctx.request.body().id)

        folder.foldername=req.foldername;
        await folder.save();
        return folder;
    }

    public async delete(ctx:HttpContextContract){
       
        const folder= await Folder.findOrFail(ctx.request.body().id)
   
        await folder.delete();
        return folder;
    }
}
