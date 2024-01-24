#!/usr/bin/env node

/* DB service for the API */

const mongoose = require('mongoose');

const PASSWORD = process.argv[2];
const MONGO_URI = `mongodb+srv://itsfoss:${PASSWORD}@fullstackopen.9koiyy6.mongodb.net/?retryWrites=true&w=majority`;

const connection = mongoose
  .connect(MONGO_URI)
  .catch((err) => console.error(err.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const Person = mongoose.model('person', personSchema);

if (process.argv.length >= 5) {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });
  newPerson.save().then(() => {
    console.log(
      `Added ${newPerson.name} number ${newPerson.number} to phonebook`
    );
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('Phonebook:');
    result.forEach((res) => console.log(`${res.name} ${res.number}`));
    mongoose.connection.close();
  });
}
