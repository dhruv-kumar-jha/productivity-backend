'use strict';

const List = require('app/services/models/List');
const ModelController = require('app/global/helpers/ModelController');


const ListController = new ModelController(List);
module.exports = ListController;

