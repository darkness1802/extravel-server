import { Request, Response } from "express"

export default interface IContext {
    req: Request,
    res: Response
} 