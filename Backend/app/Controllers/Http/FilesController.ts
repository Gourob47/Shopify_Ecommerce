 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import Application from '@ioc:Adonis/Core/Application'
export default class FilesController {
    public async store(ctx:HttpContextContract){
       
      
        const req = await ctx.request.validate({
            schema: schema.create({     
              image: schema.file({
                size: '5mb',
                extnames: ['jpg', 'png', 'jpeg', 'svg'],
              }),
         
            }),
            messages: {
              "image.required": "image field is required",          
            },
          });
          const imageName = new Date().getTime().toString() + `.${req.image.extname}`
          await req.image.move(Application.publicPath('images'), {
            name: imageName
          })

        const folderid= ctx.request.body().id;
     
        const file= await File.create({
              filename: `images/${imageName}`,
              folderId: folderid
        })
        return file;
    }

    public async get(ctx:HttpContextContract){


        const folderid= ctx.request.body().key;
        const file= await File.query().where('folder_id',ctx.params.key);
        return file;
    }


}
