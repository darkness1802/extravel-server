import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import Middleware from "../../middlewares/authChecker";
import IContext from "../../types/context.types";
import User from "../../models/user.model";

@Resolver()
export default class Main {
    @Query(_return => String)
    @UseMiddleware(Middleware)
    async hello(@Ctx() { user }: IContext): Promise<string> {

        const who = await User.findById(user.id)

        return `Hello ${who?.username ?? 'world'}`
    }
}

