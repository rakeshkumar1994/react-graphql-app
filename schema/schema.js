const graphql = require('graphql')
const _ = require('lodash')
const User = require('../models/user')
const { gql, makeExecutableSchema } = require('apollo-server-express');

const typeDefs = `
    type  User {
        name: String,
        email: String,
        phone: Int,
        address: String,
        zip: Int,
        file: String
    }
    
    type Query {
        users: [User]
    }

    type Mutation{
        addUser(
            name: String,
            email: String,
            phone: Int,
            address: String,
            zip: Int,
            file: String
        ): User

    }

    schema {
        query: Query
        mutation: Mutation
    }
`

const resolvers    ={
    Query: {
        users: (parent, args) => {
            return User.find({});
        },
    },
    Mutation:{
        addUser: (parent, args) => {
            let user = new User(args);
            return user.save()
        },
    },
}



module.exports = new makeExecutableSchema({
    typeDefs,
    resolvers
})

