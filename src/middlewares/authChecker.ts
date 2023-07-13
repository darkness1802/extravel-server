import { MiddlewareFn } from "type-graphql";
import IContext from "../types/context.types";
import { AuthenticationError } from "apollo-server-core";

const Middleware: MiddlewareFn<IContext> = ({ context }, next) => {

    console.log(context.req.headers)
    
    try {
        const auth = context.req.headers['authorization']
        const access = auth && auth.split(' ')[1]

        if (!access) {
            throw new AuthenticationError('Not authenicated')
        }

        return next()

    } catch (err) {
        throw new AuthenticationError(`Error on authenticating`)
    }

}

export default Middleware

// 01 3225