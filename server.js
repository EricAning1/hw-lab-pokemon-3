require('dotenv').config();
const express = require('express');

const app = express();
const methodOverride = require('method-override');
const port = 3000;
const mongoose = require('mongoose');
const Pokemon = require('./models/pokemon');

app.use(methodOverride('_method'));
app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
});

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
mongoose.set('strictQuery', true);
const db = mongoose.connection;

app.get('/', (req, res) => {
  res.send('Welcome to the Pokemon App!');
});

app.get('/pokemon', (req, res) => {
  Pokemon.find({}, (err, pokemonList) => {
    res.render('Index', { pokemon: pokemonList });
  });
});

app.get('/pokemon/new', (req, res) => {
  res.render('New');
});

app.delete('/pokemon/:id', (req, res) => {
  Pokemon.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/pokemon'); //redirect back to pokemon index
  });
});

app.put('/pokemon/:id', (req, res) => {
  Pokemon.findByIdAndUpdate(req.params.id, req.body, (err, updatedPokemon) => {
    console.log(updatedPokemon);
    res.redirect(`/pokemon/${req.params.id}`); // redirecting to the Show page
  });
});

app.post('/pokemon', (req, res) => {
  Pokemon.create(req.body, (err, createdPokemon) => {
    res.redirect('/pokemon');
  });
});

app.get('/pokemon/:id/edit', (req, res) => {
  Pokemon.findById(req.params.id, (err, foundPokemon) => {
    //find the pokemon
    if (!err) {
      res.render('Edit', {
        pokemon: foundPokemon, //pass in the found pokemon so we can prefill the form
      });
    } else {
      res.send({ msg: err.message });
    }
  });
});

app.get('/pokemon/:id', (req, res) => {
  Pokemon.findById(req.params.id, (err, foundPokemon) => {
    res.render('Show', { pokemon: foundPokemon });
  });
});

app.listen(port, function () {
  console.log(`listening on port ${port}...`);
});
