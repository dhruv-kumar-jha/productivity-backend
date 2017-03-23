'use strict';

const Board = require('app/services/models/Board');
const ModelController = require('app/global/helpers/ModelController');
const _ = require('lodash');

class BoardController extends ModelController {

	constructor(model) {
		super(model);
	}


	// _transform(record) {
	// 	if ( ! record.meta ) { record.meta = {} };
	// 	return record;
	// }



	index(options) {
		return super.index(options, { _user: this.store.user.id });
	}

	single(options) {
		return super.single(options, { _id: options.id, _user: this.store.user.id });
	}

	public_single(options) {
		return super.single(options, { _id: options.id, "meta.public": true });
	}





	create(data) {
		data._user = this.store.user.id;
		return super.create(data)
			.then( record => {
				record.lists = [];
				return record;
			});
	}

	update(data) {
		return super.update(data, { _id: data.id, _user: this.store.user.id });
	}

	updatePosition(data) {
		return super.update(data, { _id: data.id, _user: this.store.user.id });
	}



};


const controller = new BoardController(Board);
module.exports = controller;

