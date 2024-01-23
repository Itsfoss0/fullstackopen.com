#!/usr/bin/env node

const express = require("express");
const cors = require('cors')
const { undefinedRouteHandler } = require("./middleware/errorHandlers");
const { loggerMidleware } = require("./middleware/logging");

const { generateId } = require("./utils/utils");

const PORT = process.env.PORT || 1337;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMidleware);

app.get("/info", (request, response) => {
  const date = new Date().toString();
  const personsCount = persons.length;
  response.send(
    `<p> Phonebook has info for ${personsCount} people <br/> ${date} </p>`
  );
});

app.get("/api/persons", (request, response) => {
  return response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const personId = Number(request.params.id);
  const person = persons.find((person) => person.id === personId);
  if (person) {
    return response.json(person);
  }
  return response.status(404).json({ error: "No person found" });
});

app.delete("/api/persons/:id", (request, response) => {
  const personId = Number(request.params.id);
  const personToDelete = persons.find((person) => person.id === personId);
  if (personToDelete) {
    persons = persons.filter((person) => person.id !== personToDelete.id);
    return response.status(204);
  }
  return response.status(404).json({ error: "person not found" });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (body.name && body.number) {
    const person = persons.find((psn) => psn.name === body.name);
    if (!person) {
      const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId(persons),
      };
      persons = persons.concat(newPerson);
      return response.json(newPerson);
    }
    return response
      .status(409)
      .json({ error: "Person with that name already exists" });
  }
  return response
    .status(400)
    .json({ error: "name or number not specified in the reqeust" });
});

app.use(undefinedRouteHandler);

app.listen(PORT, () => {
  console.log(`API server running on ${PORT}`);
});
