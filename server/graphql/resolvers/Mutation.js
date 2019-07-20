const bcrypt = require('bcryptjs')
// import getUserId from '../utils/getUserId'
const generateToken = require('../../utils/generateToken')
const hashPassword = require("../../utils/hashPassword");
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const Mutation = {
  createUser: async (parent, { data }, { UserModel }, info) =>{
    // console.log(data)
    const password = await hashPassword(data.password);
    data.password = password;
    const user = new UserModel(data);
    try {
      const result = await user.save();

      return result;
    } catch (err) {
      throw new Error(err);
    }
  },
  uploadPhoto: async(parent, {filename, id}, ctx) =>{
    console.log(filename);
    console.log(id);
  //   const path = require('path');
  //   const mainDir = path.dirname(require.main.filename);
  //   filename = `${mainDir}/uploads/${filename}`;
  //   try {
  //     const photo = await cloudinary.v2.uploader.upload(filename, {
  //       use_filename: true,
  //       unique: false
  //     });
      
  //     const user = models.users[id - 1];
  //     user.photo = `${photo.public_id}.${photo.format}`;
  //     return `${photo.public_id}.${photo.format}`;
  //   } catch(error) {
  //     throw new Error(error);
  //   }      
  // }
  },
  login: async(parent, {data}, { UserModel }, info) =>{
    const {email, password} = data
      const user = await UserModel.findOne({email})

      if (!user) {
          throw new Error('Unable to login')
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
          throw new Error('Unable to login')
      }

      return {
          user,
          token: generateToken({userId: user.id, email: user.email})
      }
  },
  // async deleteUser(parent, args, { prisma, request }, info) {
  //     const userId = getUserId(request)

  //     return prisma.mutation.deleteUser({
  //         where: {
  //             id: userId
  //         }
  //     }, info)
  // },
  // async updateUser(parent, args, { prisma, request }, info) {
  //     const userId = getUserId(request)

  //     if (typeof args.data.password === 'string') {
  //         args.data.password = await hashPassword(args.data.password)
  //     }

  //     return prisma.mutation.updateUser({
  //         where: {
  //             id: userId
  //         },
  //         data: args.data
  //     }, info)
  // },
  // createPost(parent, args, { prisma, request }, info) {
  //     const userId = getUserId(request)

  //     return prisma.mutation.createPost({
  //         data: {
  //             title: args.data.title,
  //             body: args.data.body,
  //             published: args.data.published,
  //             author: {
  //                 connect: {
  //                     id: userId
  //                 }
  //             }
  //         }
  //     }, info)
  // },
  // async deletePost(parent, args, { prisma, request }, info) {
  //     const userId = getUserId(request)
  //     const postExists = await prisma.exists.Post({
  //         id: args.id,
  //         author: {
  //             id: userId
  //         }
  //     })

  //     if (!postExists) {
  //         throw new Error('Unable to delete post')
  //     }

  //     return prisma.mutation.deletePost({
  //         where: {
  //             id: args.id
  //         }
  //     }, info)
  // },
  // async updatePost(parent, args, { prisma, request }, info) {
  //     const userId = getUserId(request)
  //     const postExists = await prisma.exists.Post({
  //         id: args.id,
  //         author: {
  //             id: userId
  //         }
  //     })
  //     const isPublished = await prisma.exists.Post({ id: args.id, published: true })

  //     if (!postExists) {
  //         throw new Error('Unable to update post')
  //     }

  //     if (isPublished && args.data.published === false) {
  //         await prisma.mutation.deleteManyComments({ where: { post: { id: args.id } } })
  //     }

  //     return prisma.mutation.updatePost({
  //         where: {
  //             id: args.id
  //         },
  //         data: args.data
  //     }, info)
  // },
  // async createComment(parent, args, { prisma, request }, info) {
  //     const userId = getUserId(request)
  //     const postExists = await prisma.exists.Post({
  //         id: args.data.post,
  //         published: true
  //     })

  //     if (!postExists) {
  //         throw new Error('Unable to find post')
  //     }

  //     return prisma.mutation.createComment({
  //         data: {
  //             text: args.data.text,
  //             author: {
  //                 connect: {
  //                     id: userId
  //                 }
  //             },
  //             post: {
  //                 connect: {
  //                     id: args.data.post
  //                 }
  //             }
  //         }
  //     }, info)
  // },
  // async deleteComment(parent, args, { prisma, request }, info) {
  //     const userId = getUserId(request)
  //     const commentExists = await prisma.exists.Comment({
  //         id: args.id,
  //         author: {
  //             id: userId
  //         }
  //     })

  //     if (!commentExists) {
  //         throw new Error('Unable to delete comment')
  //     }

  //     return prisma.mutation.deleteComment({
  //         where: {
  //             id: args.id
  //         }
  //     }, info)
  // },
  // async updateComment(parent, args, { prisma, request }, info) {
  //     const userId = getUserId(request)
  //     const commentExists = await prisma.exists.Comment({
  //         id: args.id,
  //         author: {
  //             id: userId
  //         }
  //     })

  //     if (!commentExists) {
  //         throw new Error('Unable to update comment')
  //     }

  //     return prisma.mutation.updateComment({
  //         where: {
  //             id: args.id
  //         },
  //         data: args.data
  //     }, info)
  // }
};

module.exports = Mutation;
