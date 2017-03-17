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

	create(data) {
		return super.findOne({ email: data.email })
			.then( user => {
				if ( user ) {
					throw new Error('User with this email already exists.');
				}
				return super.create(data);
			})
			.catch( error => {
				return error;
			});
	}




};

const controller = new UserController(User);
module.exports = controller;

