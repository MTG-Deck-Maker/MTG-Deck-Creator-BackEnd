'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: { type: String, required: true },
  uri: String,
});

const CardModel = mongoose.model('card', cardSchema);

module.exports = CardModel;

