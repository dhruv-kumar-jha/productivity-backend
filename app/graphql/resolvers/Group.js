'use strict';

const Group = require('app/services/models/Group');
const ModelController = require('app/global/helpers/ModelController');

class GroupController extends ModelController {

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

const controller = new GroupController(Group);
module.exports = controller;

