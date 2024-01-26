#!/usr/bin/env node

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected succesfully"))
  .catch((err) =>
    console.log(`Error connecting to database\n ${err.message} `)
  );

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, newObject) => {
    newObject.id = newObject._id.toString();
    delete newObject._id;
    delete newObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
