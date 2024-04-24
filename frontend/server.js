const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Pokemon = require('./pokeModel');

const app = express();

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/pokedex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Routes
// app.use('/', express.static(path.join(__dirname, './pokedex.html')));

app.get('/pokemon', (req, res) => {
  res.sendFile(path.resolve('pokedex.html'));
});

app.get('/pokedex.css', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pokedex.css'));
});

app.get('/pokedex.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pokedex.js'));
});

// save a new Pokémon card to the database
app.post('/pokemon', async (req, res) => {
  console.log('POST is working!')
  try {
    // Extract card data from the request body
    const { name, type, desc } = req.body;

    // Create a new Pokémon card document in the database using the create method
    const newPokemonCard = await Pokemon.create({
      name,
      type,
      desc
    });

    res.status(201).json({ message: 'Pokemon card saved successfully', data: newPokemonCard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });