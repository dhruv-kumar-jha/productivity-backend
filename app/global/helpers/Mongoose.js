'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


module.exports = {

	model: {
		common(data) {
			const response = {
				timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
			};
			if ( data && data.collection ) {
				response.collection = data.collection;
			}
			return response;
		}
	},


	schema: {
	},


	user: {
		hash_password( password ) {
			let salt = bcrypt.genSaltSync(); // enter number of rounds, default: 10
			let hash = bcrypt.hashSync( password, salt );
			return hash;
		},
	},


};

