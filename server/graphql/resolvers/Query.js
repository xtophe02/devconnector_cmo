const getUserId = require('../../utils/getUserId')
const db = require('../../db')

const Query = {
  hello: () => "hello world",
  users: async(parent, args, {UserModel}, info) => UserModel.find(),
  user: (p,a,{request}) => getUserId(request,false),
    
  
    // users(parent, args, { prisma }, info) {
    //     const opArgs = {
    //         first: args.first,
    //         skip: args.skip,
    //         after: args.after,
    //         orderBy: args.orderBy
    //     }
        
    //     if (args.query) {
    //         opArgs.where = {
    //             OR: [{
    //                 name_contains: args.query
    //             }]
    //         }
    //     }

    //     return prisma.query.users(opArgs, info)
    // },
    // myPosts(parent, args, { prisma, request }, info) {
    //     const userId = getUserId(request)
    //     const opArgs = {
    //         first: args.first,
    //         skip: args.skip,
    //         after: args.after,
    //         orderBy: args.orderBy,
    //         where: {
    //             author: {
    //                 id: userId
    //             }
    //         }
    //     }

    //     if (args.query) {
    //         opArgs.where.OR = [{
    //             title_contains: args.query
    //         }, {
    //             body_contains: args.query
    //         }]
    //     }

    //     return prisma.query.posts(opArgs, info)
    // },
    // posts(parent, args, { prisma }, info) {
    //     const opArgs = {
    //         first: args.first,
    //         skip: args.skip,
    //         after: args.after,
    //         orderBy: args.orderBy,
    //         where: {
    //             published: true
    //         }
    //     }

    //     if (args.query) {
    //         opArgs.where.OR = [{
    //             title_contains: args.query
    //         }, {
    //             body_contains: args.query
    //         }]
    //     }

    //     return prisma.query.posts(opArgs, info)
    // },
    // comments(parent, args, { prisma }, info) {
    //     const opArgs = {
    //         first: args.first,
    //         skip: args.skip,
    //         after: args.after,
    //         orderBy: args.orderBy
    //     }

    //     return prisma.query.comments(opArgs, info)
    // },
    // me(parent, args, { prisma, request }, info) {
    //     const userId = getUserId(request)
        
    //     return prisma.query.user({
    //         where: {
    //             id: userId
    //         }
    //     })
    // },
    // async post(parent, args, { prisma, request }, info) {
    //     const userId = getUserId(request, false)

    //     const posts = await prisma.query.posts({
    //         where: {
    //             id: args.id,
    //             OR: [{
    //                 published: true
    //             }, {
    //                 author: {
    //                     id: userId
    //                 }
    //             }]
    //         }
    //     }, info)

    //     if (posts.length === 0) {
    //         throw new Error('Post not found')
    //     }

    //     return posts[0]
    // }
}

module.exports =  Query