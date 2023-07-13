import { Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"

export default interface IContext {
    req: Request,
    res: Response
    user: JwtPayload & { id: string }
} 