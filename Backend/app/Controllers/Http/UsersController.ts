import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Schema from '@ioc:Adonis/Lucid/Schema';
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import User from 'App/Models/User';
export default class UsersController {
    public async registerUser(ctx: HttpContextContract){
 
        const validations = schema.create({
            name:schema.string({ }),
            email: schema.string({}, [
              rules.email(),
              rules.unique({ table: "users", column: "email" }),
            ]),
            password: schema.string({}),
            username: schema.string({}, [
              rules.unique({ table: "users", column: "username" }),
            ]),
          });

          const data = await ctx.request.validate({ schema: validations });

     
          const user = await User.create(data);
    
          await ctx.auth.use("web").login(user);
         ctx.response.cookie("user", ctx.auth.user);
         return ctx.response.json({ user: ctx.auth.user });
    }


    public async loginUser(ctx: HttpContextContract){
        const email = ctx.request.input("email");
        const password = ctx.request.input("password");
        await ctx.auth.use("web").attempt(email, password);
     
        ctx.response.cookie("user", ctx.auth.user);
        const session= ctx.session;
        return ctx.response.json({ user: ctx.auth.user, session });
    }


    public async logoutUser(ctx: HttpContextContract){
         
         return await ctx.auth.use("web").logout();      
    }

}
