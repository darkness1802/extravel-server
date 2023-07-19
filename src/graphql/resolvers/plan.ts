import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from "type-graphql";
import { CreatePlanInput } from "../../types/request/plan.types";
import { PlanResponse } from "../../types/response/plan.types";
import IContext from "../../types/context.types";
import Plan from "../../models/plan.model";
import User from "../../models/user.model";
import Middleware from "../../middlewares/authChecker";

@Resolver()

export default class PlanResolver {

    @Mutation(_res => PlanResponse)
    @UseMiddleware(Middleware)
    async createPlan(
        @Ctx() { user }: IContext,
        @Arg('createPlanInput') createPlanInput: CreatePlanInput
    ): Promise<PlanResponse> {
        try {
            const { title, description } = createPlanInput
            const newPlan = await Plan.create({ title, description, owner: user.id })
            return { code: 200, msg: "Ok", success: true, data: {
                id: newPlan._id.toString(),
                title: newPlan.title,
                description: newPlan.description
            } }
        } catch (err) {
            console.log(err)
            return { code: 500, msg: "Error", success: false }
        }
    }

}