'use strict';

const mongoose = require('mongoose');
const Helper = require('app/global/helpers/Mongoose');

const ListSchema = mongoose.Schema(
	{
		_board: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: 'Board'
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String
		},
		position: {
			type: Number
		},
		status: {
			type: Number,
			default: 1
		},
	},

	Helper.model.common({ collection: 'lists' })

);

ListSchema.virtual('cards', {
	ref: 'Card',
	localField: '_id',
	foreignField: '_list',
});


module.exports = mongoose.model( 'List', ListSchema );
