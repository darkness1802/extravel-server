import { JwtPayload, sign, verify } from "jsonwebtoken"
import type { Response } from "express"

type AuthVerified = JwtPayload & { id: string }

export const generateToken = (userId: string, expiresIn?: string) => {
    const payload = { id: userId }
    const limit = { expiresIn: expiresIn ?? '30s' }
    return sign(payload, process.env.PRIVATE_KEY as string, limit)
}

export const verifyToken = (accessToken: string): AuthVerified => {
    return verify(accessToken, process.env.PRIVATE_KEY as string) as AuthVerified
}

type SendRefreshTokenPayload = {
    res: Response,
    userId: string,
    limit?: string
}

export const sendRefreshToken = ({res, userId, limit}:SendRefreshTokenPayload) => {
    res.cookie(
        'EXTRAVEL_REFRESH_TOKEN',
        generateToken(userId, limit ?? '60m'),
        {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/refresh_token'
        }    
    )
}