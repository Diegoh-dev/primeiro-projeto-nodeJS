const { request } = require("express");
const { response } = require("express");
const express = require("express");

const app = express();

const port = 3005;

app.use(express.json());

const users = [];

const uuid = require("uuid");

const middlewares = (request, response, next) => {
  const { id } = request.params;

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "user not found." });
  }

  request.userId = id;
  request.index = index;

  next();
};

//app.use(middlewares);

app.get("/usuarios", (request, response) => {
  return response.json(users);
});

app.post("/usuarios", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);

  return response.status(201).json(user);
});

app.put("/usuarios/:id", middlewares, (request, response) => {
  const id = request.userId;
  const index = request.index;

  const { name, age } = request.body;

  const updateUser = { id, name, age };

  users[index] = updateUser;

  return response.json(updateUser);
});

app.delete("/usuarios/:id", middlewares, (request, response) => {
  const id = request.userId;

  const indexUser = request.index;

  users.splice(indexUser, 1);
  return response.status(204).json();
});

app.listen(port, () => {
  console.log("server running ✔");
});
