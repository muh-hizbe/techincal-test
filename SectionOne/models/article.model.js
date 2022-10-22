module.exports = mongoose => {
    const articleSchema = mongoose.Schema({
        title: {
            type: String
        },
        content: {
            type: String
        },
        writer: {
            type: String
        },
        comments: [{
            type: mongoose.Types.ObjectId,
            ref: 'Comment'
        }]
    }, {
        timestamps: true
    })

    articleSchema.method("toJSON", function() {
        const { __v, createdAt, updatedAt, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    const Article = mongoose.model("Article", articleSchema)
    return Article
}