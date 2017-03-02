'use strict';

const mongoose = require('mongoose');
const Helper = require('app/global/helpers/Mongoose');

const CardSchema = mongoose.Schema(
	{
		_list: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: 'List'
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

	Helper.model.common({ collection: 'cards' })

);


module.exports = mongoose.model( 'Card', CardSchema );
