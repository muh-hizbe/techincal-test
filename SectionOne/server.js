const cors = require("cors")
const express = require("express")
const { graphqlHTTP } = require("express-graphql");
const { db } = require("./models/index")
const appConfig = require("./configs/app.config")
const schema = require("./graphql/schema")
const resolver = require("./graphql/resolver")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to database");
}).catch(() => {
    console.log("can't connect to database");
    process.exit
})

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}))

app.listen(appConfig.port);
console.log("app running on port 4000");