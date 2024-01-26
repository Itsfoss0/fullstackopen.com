#!/usr/bin/env node

const express = require('express');
const cors = require('cors');

const {
  undefinedRouteHandler,
  malformedIdError
} = require('./middleware/errorHandlers');
const { loggerMidleware } = require('./middleware/logging');
const Person = require('./models/person');

const PORT = process.env.PORT || 1337;

const app = express();

app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(loggerMidleware);

app.get('/info', async (request, response) => {
  const date = new Date().toString();
  const personsCount = await Person.countDocuments({});
  response.send(
    `<p> Phonebook has info for ${personsCount} people <br/> ${date} </p>`
  );
});

app.get('/api/persons', async (request, response) => {
  const allPerson = await Person.find({});
  return response.json(allPerson);
});

app.get('/api/persons/:id', async (request, response) => {
  const personId = request.params.id;
  const person = await Person.findById(personId);
  if (person) {
    return response.json(person);
  }
  return response.status(404).json({ error: 'No person found' });
});

app.put('/api/persons/:id', async (request, response, next) => {
  try {
    const body = request.body;
    const person = {
      name: body.name,
      number: body.number
    };
    const personId = request.params.id;

    const updatedPerson = await Person.findByIdAndUpdate(personId, person, {
      new: true
    });
    return response.json(updatedPerson);
  } catch (err) {
    return next(err);
  }
});
app.delete('/api/persons/:id', async (request, response) => {
  /* the frontend does need the deleted resource
     to update the state.
     so we get  the resource before deleting it
     and send the it on delete instead of the usual 204
  */
  const personId = request.params.id;
  const personToDelete = await Person.findById(personId);
  if (personToDelete) {
    try {
      await Person.deleteOne({ _id: personId });
      return response.json(personToDelete);
    } catch (err) {
      return response.status(500).json({ error: 'Interal server error' });
    }
  }
  return response.status(404).json({ error: 'person not found' });
});

app.post('/api/persons', async (request, response) => {
  const body = request.body;

  if (body.name && body.number) {
    try {
      const person = await Person.findOne({ name: body.name });

      if (!person) {
        const newPerson = new Person({
          name: body.name,
          number: body.number
        });

        await newPerson.save();
        return response.json(newPerson);
      } else {
        return response
          .status(409)
          .json({ error: 'Person with that name already exists' });
      }
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return response
      .status(400)
      .json({ error: 'Name or number not specified in the request' });
  }
});

app.use(malformedIdError);
app.use(undefinedRouteHandler);

app.listen(PORT, () => {
  console.log(`API server running on ${PORT}`);
});
