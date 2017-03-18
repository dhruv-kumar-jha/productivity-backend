'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Helper = require('app/global/helpers/Mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true,
		},
		password: {
			type: String
		},
		phone: {
			type: String
		},
		dob: {
			type: String
		},

		// 0: unspecified, 1: male, 2: female
		gender: {
			type: Number,
			default: 0
		},

		// any meta information we want to add about the user can be added here.
		meta: {
			type: mongoose.Schema.Types.Mixed
		},

		status: {
			type: Number,
			default: 1
		},
	},

	Helper.model.common({ collection: 'users' })

);


UserSchema.methods.comparePassword = function(password) {
	if ( ! this.password ) {
		return false;
	}
	return bcrypt.compareSync( password, this.password );
};


UserSchema.pre('save', function(next) {
	// check if password is present and is modified.
	if ( this.password && this.isModified('password') ) {
		this.password = Helper.user.hash_password(this.password);
	}
	// do stuff
	next();
});


module.exports = mongoose.model( 'User', UserSchema );
