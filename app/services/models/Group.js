'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Helper = require('app/global/helpers/Mongoose');

const GroupSchema = mongoose.Schema(
	{
		_user: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: 'User'
		},
		name: {
			type: String,
			required: true
		},
		description: {
			type: String
		},

		meta: {
			type: mongoose.Schema.Types.Mixed,
			default: {}
		},

		status: {
			type: Number,
			default: 1
		},
	},

	Helper.model.common({ collection: 'groups' })

);


module.exports = mongoose.model( 'Group', GroupSchema );
