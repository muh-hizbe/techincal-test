const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type PageInfo {
        total_data: Int!,
        per_page: Int,
        total_page: Int,
        page: Int
    }
    type ArticleWithComment {
        _id: ID!,
        title: String!,
        content: String!,
        writer: String!,
        comments: [Comment!]!
    }
    type Article {
        _id: ID!,
        title: String!,
        content: String!,
        writer: String!,
    }
    type Articles {
        data: [Article]!,
        pageInfo: PageInfo!
    }
    type CommentWithArticle {
        _id: ID!,
        name: String!,
        comment: String!,
        article: Article
    }
    type Comment {
        _id: ID!,
        name: String!,
        comment: String!,
    }
    type Comments {
        data: [Comment]!,
        pageInfo: PageInfo!
    }
    type Query {
        getArticles(page: Int, perPage: Int, filter: String, sortBy: String, search: String): Articles!,
        getArticle(id: ID!): ArticleWithComment!,
        getComments(page: Int, perPage: Int, filter: String, sortBy: String, search: String): Comments!,
        getComment(id: ID!): CommentWithArticle!,
    }
    type Mutation {
        createArticle(title: String!, content: String!, writer: String!): Article!,
        updateArticle(id: ID!, title: String, content: String, writer: String): Article!,
        deleteArticle(id: ID!): String!,
        
        createComment(name: String!, comment: String!, articleId: ID!): Comment!,
        updateComment(id: ID!, name: String, comment: String): Comment!,
        deleteComment(id: ID!): String!,
    }
`)