'use strict';

const User = require('app/services/models/User');
const ModelController = require('app/global/helpers/ModelController');
const Helper = require('app/global/helpers/Auth');


class AuthController extends ModelController {

	constructor(model) {
		super(model);
	}


	login(options) {
		return this.model.findOne({ email: options.email })
			.exec()
			.then( user => {
				if ( ! user ) {
					return { error: { message: 'Invalid email and/or password provided' } };
				}

				if ( ! user.comparePassword(options.password) ) {
					return { error: { message: 'Incorrect password provided' } };
				}

				if ( user && user.comparePassword(options.password) ) {
					const token = Helper.generateToken(user);
					return { token: token };
				}

			})
			.catch( error => {
				return error;
			});

	}




};


const controller = new AuthController(User);
module.exports = controller;



