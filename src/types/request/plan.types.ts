import { Field, InputType } from "type-graphql"

@InputType()
export abstract class CreatePlanInput {
    @Field(_type => String)
    title!: string
    @Field(_type => String)
    description!: string
}