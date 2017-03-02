'use strict';

const Board = require('app/services/models/Board');
const ModelController = require('app/global/helpers/ModelController');


class BoardController extends ModelController {

	constructor(model) {
		super(model);
	}

	index(options) {
		return super.index(options, { _user: this.store.user.id });
	}

	create(data) {
		data._user = this.store.user.id;
		return super.create(data);
	}

	update(data) {
		return super.update(data, { _id: data.id, _user: this.store.user.id });
	}



};


const controller = new BoardController(Board);
module.exports = controller;
