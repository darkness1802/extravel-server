import { Resolver, Query, UseMiddleware } from "type-graphql";
import Middleware from "../../middlewares/authChecker";

@Resolver()
export default class Main {
    @Query(_return => String)
    @UseMiddleware(Middleware)
    hello(): string {
        return "string"
    }
}

