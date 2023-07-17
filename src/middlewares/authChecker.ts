import { MiddlewareFn } from "type-graphql";
import IContext from "../types/context.types";
import { AuthenticationError } from "apollo-server-core";
import { verifyToken } from "../utils/tokenManager";
import { JwtPayload } from "jsonwebtoken";

const Middleware: MiddlewareFn<IContext> = ({ context }, next) => {

    try {
        const auth = context.req.headers['authorization']
        const accessToken = auth && auth.split(' ')[1]

        if (!accessToken) {
            throw new AuthenticationError('Not authenicated')
        }

        const decodedUser = verifyToken(accessToken) as JwtPayload & { id: string }

        context.user = decodedUser

        return next()

    } catch (err) {
        throw new AuthenticationError(`Error on authenticating: ${JSON.stringify(err)}`)
    }

}

export default Middleware

// 01 3225