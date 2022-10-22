const { db } = require("../models/index")
const Article = db.article
const Comment = db.comment

module.exports = {
    read: async ({ page = 1, perPage = 10, filter = 'createdAt', sortBy = 'asc', search = null }) => {
        let totalRows = await Comment.find().countDocuments()
        let totalPage = Math.ceil(totalRows / perPage)

        const result = await Comment.aggregate([
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

    create: async ({ name, comment, articleId }) => {
        const commentData = new Comment({
            name,
            comment,
            article: articleId
        })

        try {
            await Article.updateMany({
                _id: articleId
            }, {
                $push: {
                    comments: commentData.id
                }
            })

            await commentData.save()
            return commentData
        } catch (error) {
            throw new Error("fail to create comment")
        }
    },

    readOne: async ({ id }) => {
        const comment = await Comment.findById(id).populate('article')
        if (!comment) {
            throw new Error('comment not found')
        }
        return comment
    },

    update: async ({ id, name = null, comment = null }) => {
        const commentData = await Comment.findById(id)
        if (!commentData) {
            throw new Error('comment not found')
        }
        commentData.name = name ?? commentData.name
        commentData.comment = comment ?? commentData.comment

        try {
            await commentData.save()
            return commentData
        } catch (error) {
            throw new Error("fail update comment")
        }
    },

    delete: async ({ id }) => {
        const commentData = await Comment.findById(id)
        if (!commentData) {
            throw new Error("comment not found")
        }

        await Article.updateMany({
            _id: commentData.article
        }, {
            $pull: {
                comments: commentData.id
            }
        })
        await commentData.remove()
        return "comment deleted"
    },
}