import { Field, InputType } from "type-graphql"

@InputType()
export abstract class SignupInput {
    @Field(_type => String)
    username!: string
    @Field(_type => String)
    password!: string
    @Field(_type => String)
    email!: string
}

@InputType()
export abstract class SigninInput {
    @Field(_type => String)
    password!: string
    @Field(_type => String)
    email!: string
}

