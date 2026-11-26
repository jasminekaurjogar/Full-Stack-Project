import express from "express";

// This is the back-end app. The React pages will call it later.
const app = express();
const port = 3001;

app.use(express.json());

app.get("/", function (_req, res) {
  res.send("Piggy Bank API is running.");
});

app.listen(port, function () {
  console.log("Server is listening on port " + port);
});
