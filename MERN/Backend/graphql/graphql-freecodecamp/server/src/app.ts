import express from "express";
import { graphqlHTTP } from 'express-graphql';
import schema from "./schema";

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(8080, () => {
    console.log("Server is running on port http://localhost:8080");
})

export default app;