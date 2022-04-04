const express = require("express");

const app = express();

const port = 3005;

app.use(express.json());

const users = [];

const uuid = require("uuid");

app.get("/usuarios", (request, response) => {
  return response.json(users);
});

app.post("/usuarios", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);

  return response.json(user);
});

app.put("/usuarios", (request, response) => {
  return response.json({ msg: "ok" });
});

app.listen(port, () => {
  console.log("server running ✔");
});
