import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

// initialize express application
const app: Express = express();

// allow use of .env variables
dotenv.config();

// add morgan middleware, combined format logs info about each HTTP request
app.use(morgan("combined"));

// allow express to parse json
app.use(express.json());

// listen for requests on root and send simple text response
app.get("/", (_req, res) => {
    res.send("Got response from backend!");
});

export default app;
