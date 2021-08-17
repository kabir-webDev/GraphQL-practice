const axios = require("axios");
const { findByIdAndDelete } = require("./model/PostModel");
const Post = require("./model/PostModel");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello Bello";
    },
    user: async () => {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return result.data;
    },
    getAllPosts: async () => {
      const posts = await Post.find();
      return posts;
    },
    getPostById: async (a, { id }, b, c) => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (parent, { id }, context, info) => {
      await Post.findByIdAndDelete(id);
      return "Post Deleted Successfully";
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { title, description } = args.post;
      const updates = {};
      if (title !== undefined) {
        updates.title = title;
      }
      if (description !== undefined) {
        updates.description = description;
      }
      return await Post.findByIdAndUpdate(id, updates, { new: true });
    },
  },
};

module.exports = resolvers;
