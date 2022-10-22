const mongoose = require("mongoose")
const dbConfig = require("../configs/db.config")
mongoose.Promise = global.Promise

const conn = mongoose.connection
const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

db.article = require("./article.model")(mongoose)
db.comment = require("./comment.model")(mongoose)

module.exports = { db, conn }