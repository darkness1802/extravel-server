import { InterfaceType, ObjectType, Field } from "type-graphql"

@ObjectType()
export class Auth {
    @Field()
    token!: string
    @Field()
    id!: string
}

@ObjectType()
export class Errors {
    @Field({ nullable: true })
    general?: string
    @Field({ nullable: true })
    username?: string
    @Field({ nullable: true })
    email?: string
    @Field({ nullable: true })
    password?: string
    @Field({ nullable: true })
    confirmPassword?: string
}


@InterfaceType()
export default abstract class Response {
    @Field(_type => Number)
    code!: number
    @Field(_type => Boolean)
    success!: boolean
    @Field(_type => String, { nullable: true })
    msg?: string

}

@ObjectType({ implements: Response })
export class AuthResponse implements Response {
    code!: number
    success!: boolean
    msg?: string

    @Field(_type => Errors, { nullable: true })
    error?: Errors
    @Field(_type => Auth, { nullable: true })
    auth?: Auth
}