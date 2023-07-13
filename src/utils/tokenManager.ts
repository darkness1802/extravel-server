import { sign } from "jsonwebtoken"

export const generateToken = (userId: string) => {
    const payload = { id: userId }
    const limit = { expiresIn: '20m' }
    return sign(payload, process.env.PRIVATE_KEY as string, limit)
}