'use strict';

const mongoose = require('mongoose');
const Helper = require('app/global/helpers/Mongoose');

const BoardSchema = mongoose.Schema(
	{
		_user: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: 'User'
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String
		},

		// this might contain background { color, image } fields.
		// not yet decided.
		meta: {
			type: mongoose.Schema.Types.Mixed
		},

		status: {
			type: Number,
			default: 1
		},
	},

	Helper.model.common({ collection: 'boards' })

);

BoardSchema.virtual('user', {
	ref: 'User',
	localField: '_user',
	foreignField: '_id',
	justOne : true
});

BoardSchema.virtual('lists', {
	ref: 'List',
	localField: '_id',
	foreignField: '_board',
});


module.exports = mongoose.model( 'Board', BoardSchema );
