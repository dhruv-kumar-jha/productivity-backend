'use strict';

const GQLFields = require('./GQLFields');


const Helper = {

    getFields: GQLFields,


	getUserPopulate(data) {
		const fields = Helper.getFields(data);
		const populate = [];
		return populate;
	},



	getBoardPopulate(data) {
		const fields = Helper.getFields(data);
		const populate = [];

		if ( fields.user ) {
			populate.push({ path: 'user' });
		}

		if ( fields.lists ) {
			if ( fields.lists.cards ) { populate.push({ path: 'lists', populate: { path: 'cards' } }); }
			else { populate.push({ path: 'lists' }); }
		}

		return populate;
	},


	getListPopulate(data) {
		return [];
	},

	getCardPopulate(data) {
		return [];
	},



};

module.exports = Helper;
