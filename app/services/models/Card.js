'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Helper = require('app/global/helpers/Mongoose');

const TodoSchema = mongoose.Schema({
	title: { type: String },
	description: { type: String },
	completed: { type: Boolean },
});


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

		// this will contain info like duedate, images, customizations, etc
		meta: {
			type: mongoose.Schema.Types.Mixed,
			default: {}
		},

		todos: [ TodoSchema ],

		status: {
			type: Number,
			default: 1
		},
	},

	Helper.model.common({ collection: 'cards' })

);


module.exports = mongoose.model( 'Card', CardSchema );
