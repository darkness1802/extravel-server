import { InterfaceType, ObjectType, Field } from "type-graphql"
import Response from "./response.types"

@ObjectType()
export class Plan {
    @Field()
    id!: string
    @Field()
    title!: string
    @Field()
    description!: string
}

@ObjectType({ implements: Response })
export class PlanResponse implements Response {
    code!: number
    success!: boolean
    msg?: string

    @Field(_type => Plan, { nullable: true })
    data?: Plan
}