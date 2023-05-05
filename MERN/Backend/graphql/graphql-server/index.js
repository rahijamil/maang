import { buildSchema } from "graphql";
import express from "express";
import fs from "fs";
import { graphqlHTTP } from "express-graphql";
import resolvers from "./resolvers.js";

const app = express();

const schema = buildSchema(`
  ${fs.readFileSync("./schema.graphql", { encoding: "utf8" })}
`);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
