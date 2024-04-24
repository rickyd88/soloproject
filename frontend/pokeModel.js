const mongoose = require('mongoose');

// The document schema should have 4 things
// All of these should be required.
// Create your schema here

const pokeSchema = new mongoose.Schema({
// A "Name" that is a string
  name: {
    type: String,
    required: true
  },
  // A "lastName" that is a string
  type: {
    type: String,
    required: true
  },
  // An "age" that is a number
  desc: {
    type: String,
    required: true
  },
});



// The collection name should be Pokemon
const Pokemon = mongoose.model('Pokemon', pokeSchema);
// You must export your model through module.exports
module.exports = Pokemon;