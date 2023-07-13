import "reflect-metadata"
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { createServer } from "http"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import MainResolver from "./graphql/resolvers"
import Schema from "./graphql/typeDefs"
import UserResolver from "./graphql/resolvers/user"

dotenv.config()

async function main() {

    const PORT = process.env.PORT || 4000

    mongoose
        .connect(process.env.DATABASE as string)
        .then(() => {
            console.log(`connected to database`)
        }).catch(() => {
            console.log(`cannot connect to database`)
        })
    
    const app = express()
    const httpServer = createServer(app)
    const apolloServer = new ApolloServer({
        context: ({ req, res }) => {
            return ({ req, res })
        }, schema: await buildSchema({
            validate: false, resolvers: [
                MainResolver, UserResolver
            ] }
        ), plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),
            // ApolloServerPluginLandingPageGraphQLPlayground
        ]
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app })

    await new Promise (resolve => httpServer.listen({ port: PORT }, resolve as () => void))

    console.log(`Server is started on port ${PORT}`)
}

main().catch(err => console.log(`Cannot start server:`, err))