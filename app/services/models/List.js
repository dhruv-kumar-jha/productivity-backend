'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const _ = require('lodash');

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

		// store position of all the cards in this list.
		positions: [],

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


ListSchema.pre('remove', function(next) {
	const Card = mongoose.model('Card');
	Card.remove({ _list: this._id })
		.then( () => {
			next();
		});
});


/*
When a list is added, Add it in the board positions as well, so it will be displayed in the exact same order when added., unless
user chnages the order.

Maybe delete it as well, when removed.. but even if not deleted from positions, frontend can easily handle it.

 */
/*
ListSchema.post('save', function(doc) {
	const Board = mongoose.model('Board');
	Board.findOne({ _id: doc._board })
		.exec()
		.then( record => {
			if ( ! record.positions ) { record.positions = []; }
			const isInArray = record.positions.some( (id) => {
				return id.equals(doc._id);
			});

			if ( ! isInArray ) {
				record.positions.push( doc._id );
				record.save();
			}
		})
		.catch( error => { // error occoured, handle it. });
});
*/


module.exports = mongoose.model( 'List', ListSchema );
