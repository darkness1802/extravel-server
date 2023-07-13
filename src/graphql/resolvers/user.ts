import { Mutation, Resolver, Arg } from "type-graphql";
import { SignupInput, SigninInput } from "../../types/request.types";
import User from "../../models/user.model";
import argon2 from "argon2";
import Response, { AuthResponse } from "../../types/response.types";
import { generateToken } from "../../utils/tokenManager";

@Resolver()

export default class UserResolver {
    @Mutation(_res => AuthResponse)
    async signup(@Arg('signupInput') signupInput: SignupInput): Promise<AuthResponse> {
        const { password, email } = signupInput
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return { code: 400, success: false, msg: "User is existed" }
        }

        const hashedPassword = await argon2.hash(password)

        const newUser =  await User.create({ ...signupInput, password: hashedPassword })
        
        const token = generateToken(newUser._id.toString())

        return { code: 200, success: true, msg: "Complete Signup", auth: { token, id: newUser._id.toString() }}
    }
    
    @Mutation(_res => AuthResponse)
    async signin(@Arg('signinInput') signinInput: SigninInput): Promise<AuthResponse> {
        const { email, password } = signinInput
        const existedUser = await User.findOne({ email })

        if (!existedUser) return { code: 400, success: false, msg: "User is not found" }

        const isValidPassword = await argon2.verify(existedUser.password, password)

        if (!isValidPassword) {
            return { code: 400, success: false, msg: "Incorrect password" }
        } else {
            const token = generateToken(existedUser._id.toString())
            return { code: 200, success: true, msg: "Signin successfully", auth: {
                token, id: existedUser._id.toString()
            } }
        }
    }
}