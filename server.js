'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mtg = require('mtgsdk');
const Card = require('./models/card');

const verifyUser = require('./auth');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

// GET SEARCH CARDS FROM MTG API
app.get('/card/:name', getCard);
async function getCard(req, res, next) {
  try {
    let searchCard = await mtg.card.where({ name: `${req.params.name}` })
      .then(results => {
        return (results);
      });
    res.status(200).send(searchCard);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// DELETE CARDS FROM DATABASE
app.delete('/card/:cardId', deleteCard);
async function deleteCard(req, res, next) {
  try {
    let id = req.params.cardId;
    await Card.findByIdAndDelete(id);
    res.status(200).send('card deleted');
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// UPDATE CARD OWNED STATUS
app.put('/card/:cardId', updateCard);
async function updateCard(req, res, next) {
  try {
    let id = req.params.cardId;
    let cardData = req.body;
    const updatedCard = await Card.findByIdAndUpdate(id, cardData, { new: true, overwrite: true });
    res.status(200).send(updatedCard);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.use(verifyUser);

// GET SAVED CARDS FROM DATABASE
app.get('/card', savedCard);
async function savedCard(req, res, next) {
  try {

    console.log(req.user.email);
    let savedCard = await Card.find({ email: req.user.email });
    res.status(200).send(savedCard);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// ADD/SAVE CARD TO DATABASE
app.post('/card', postCard);
async function postCard(req, res, next) {
  try {

   
    let createdCard = await Card.create({ ...req.body, email: req.user.email });
    res.status(200).send(createdCard);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

// ERROR HANDLING
app.get('*', (req, res) => {
  res.status(404).send('Not available.');
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
