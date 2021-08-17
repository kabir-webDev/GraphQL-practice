const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    userId: Int
    id: Int
    title: String
    body: String
  }
  type Posts {
    id: ID
    title: String
    description: String
  }

  input PostInput {
    title: String
    description: String
  }

  type Query {
    hello: String
    user: [Post]
    getAllPosts: [Posts]
    getPostById(id: ID): Posts
  }

  type Mutation {
    createPost(post: PostInput): Posts
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Posts
  }
`;

module.exports = typeDefs;
