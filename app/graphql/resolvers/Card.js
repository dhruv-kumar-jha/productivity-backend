'use strict';

const Card = require('app/services/models/Card');
const ModelController = require('app/global/helpers/ModelController');


const CardController = new ModelController(Card);
module.exports = CardController;

