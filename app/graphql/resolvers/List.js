'use strict';

const List = require('app/services/models/List');
const ModelController = require('app/global/helpers/ModelController');

class ListController extends ModelController {

	constructor(model) {
		super(model);
	}

	create(data) {
		return super.create(data)
			.then( record => {
				record.cards = [];
				return record;
			});
	}


	updatePosition(data) {
		return super.update(data);
	}


};

const controller = new ListController(List);
module.exports = controller;

