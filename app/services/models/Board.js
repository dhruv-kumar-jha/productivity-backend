'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

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
			type: mongoose.Schema.Types.Mixed,
			default: {}
		},

		// store the position of the lists, so users can freely re-arrange them.
		// and we only have to update this field.
		positions: [],

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

BoardSchema.pre('remove', function(next) {
	const List = mongoose.model('List');

	List.find({ _board: this._id })
		.exec()
		.then( records => {
			records.map( record => {
				record.remove();
			});
			next();
		})
		.catch( error => {
			console.log('error',error);
		});

});


module.exports = mongoose.model( 'Board', BoardSchema );
