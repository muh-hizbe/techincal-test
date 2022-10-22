module.exports = mongoose => {
    const commentSchema = mongoose.Schema({
        name: {
            type: String
        },
        comment: {
            type: String
        },
        article: {
            type: mongoose.Types.ObjectId,
            ref: 'Article'
        }
    }, {
        timestamps: true
    })

    commentSchema.method("toJSON", function () {
        const { __v, createdAt, updatedAt, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    const Comment = mongoose.model("Comment", commentSchema)
    return Comment
}