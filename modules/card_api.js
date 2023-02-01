'use strict';

const axios = require('axios');
const CardModel = require('./models/card');

let cardData = {};

async function card_api(req, res, next) {

  try {
    let name = req.query.name;

    let url = `https://api.magicthegathering.io/v1/cards`;

    let dataToGroom = await axios.get(url);
    dataToGroom = dataToGroom.data.cards;

    cardData = new CardModel(dataToGroom);

    res.status(200).send(cardData);

  } catch (error) {
    res.status(401).send('error');
    next(error);
  }
}

let Card = class {
  constructor(dataObj) {
    this.name = dataObj.name;
  }
};

module.exports = card_api;
