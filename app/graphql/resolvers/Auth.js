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
					throw new Error('Invalid email and/or password provided');
				}

				if ( ! user.comparePassword(options.password) ) {
					throw new Error('Invalid password provided');
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


	logout(options) {
		const id = this.store.user.id;
		return { status: true, id: id };
	}





};


const controller = new AuthController(User);
module.exports = controller;



