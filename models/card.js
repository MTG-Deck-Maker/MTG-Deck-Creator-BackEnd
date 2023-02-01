'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: { type: String, required: true },
  rarity: { type: String, required: true },
  imageUrl: { type: String, required: true },
  owned: { type: Boolean, required: true },
  email: { type: String }
});

const CardModel = mongoose.model('card', cardSchema);

module.exports = CardModel;

