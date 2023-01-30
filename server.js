'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mtg = require('mtgsdk');



const Card = require('./models/card');

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


app.get('/', (req, res) => {
  res.status(200).send('Welcome!');
});

app.get('/card', getCard);
async function getCard(req, res, next) {
  try {
    let allBooks = await Card.find({});
    res.status(200).send(allBooks);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.delete('/card/:cardId', deleteCard);
async function deleteCard(req, res, next) {
  try {
    let id = req.params.bookID;
    await Card.findByIdAndDelete(id);
    res.status(200).send('card deleted');
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.post('/books', postBook);
async function postBook(req, res, next) {
  try {
    let createdBook = await (Card.create(req.body));
    res.status(200).send(createdBook);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.put('/books/:bookId', updateBook);
async function updateBook(req, res, next){
  try {
    let id = req.params.bookId;
    let bookData = req.body;
    const updatedBook = await Card.findByIdAndUpdate(id, bookData, { new: true, overwrite: true });
    res.status(200).send(updatedBook);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Not available.');
});

app.use((error, req, res) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
