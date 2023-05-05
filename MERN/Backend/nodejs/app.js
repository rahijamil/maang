import express from "express";
import { readFile } from "fs";

const app = express();

const readHtmlFile = (res, path) => {
  readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(data);
    }
  });
};

app.get("/home", (req, res) => {
  readHtmlFile(res, "views/home.html");
});

app.get("/users", (req, res) => {
  readHtmlFile(res, "views/users.html");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
