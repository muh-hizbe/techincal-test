const { db } = require("../models/index")
const Article = db.article
const Comment = db.comment

module.exports = {
    read: async ({ page = 1, perPage = 10, filter = 'createdAt', sortBy = 'asc', search = null }) => {
        let totalRows = await Article.find().countDocuments()
        let totalPage = Math.ceil(totalRows / perPage)

        const result = await Article.aggregate([
            { $match: {} },
            { $sort: { createdAt: (sortBy === 'asc' ? 1 : -1) } },
            { $skip: page - 1 },
            { $limit: perPage },
        ])

        return {
            data: result,
            pageInfo: {
                page: page,
                per_page: perPage,
                total_data: totalRows,
                total_page: totalPage
            }
        }
    },

    create: async ({ title, content, writer }) => {
        const article = new db.article({
            title,
            content,
            writer
        })

        try {
            await article.save()
            return article
        } catch (error) {
            throw new Error("fail to create article")
        }
    },

    readOne: async ({ id }) => {
        const article = await Article.findById(id).populate('comments')
        if (!article) {
            throw new Error('article not found')
        }
        return article
    },

    update: async ({ id, title = null, content = null, writer = null }) => {
        const article = await Article.findById(id)
        if (!article) {
            throw new Error('article not found')
        }
        article.title = title ?? article.title
        article.content = content ?? article.content
        article.writer = writer ?? article.writer

        try {
            await article.save()
            return article
        } catch (error) {
            throw new Error("fail update article")
        }
    },

    delete: async ({ id }) => {
        const article = await Article.findById(id)
        if (!article) {
            throw new Error("article not found")
        }

        await Comment.deleteMany({
            _id: { $in: article.comments}
        })

        await article.remove()
        return "article deleted"
    },
}