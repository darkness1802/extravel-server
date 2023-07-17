import express, { Request, Response } from "express"
import { generateToken, sendRefreshToken, verifyToken } from "../utils/tokenManager"
import User from "../models/user.model"

const refreshTokenHandler = express.Router()

refreshTokenHandler.get("/", async (req: Request, res: Response) => {
    try {
        const refresh_token = req.cookies['EXTRAVEL_REFRESH_TOKEN']

        if (!refresh_token) return res.sendStatus(401)
        const decodedUser = verifyToken(refresh_token)
        const existedUser = await User.findById(decodedUser.id)

        if (!existedUser) {
            return res.sendStatus(401)
        }

        sendRefreshToken({ res, userId: decodedUser.id })

        return res.json({
            auth: {
                token: generateToken(existedUser._id.toString()),
                id: existedUser._id.toString()
            }
        })
    } catch (err) {
        console.log(`Error on refresh token handler`)
        return res.sendStatus(403)
    }
})

export default refreshTokenHandler