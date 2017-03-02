'use strict';

const User = require('app/services/models/User');
const ModelController = require('app/global/helpers/ModelController');


class UserController extends ModelController {

	constructor(model) {
		super(model);
	}

	current(options) {
		return options.user;
	}


};

const controller = new UserController(User);
module.exports = controller;

