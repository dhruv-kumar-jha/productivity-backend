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
			if ( fields.lists.cards ) {
				populate.push({
					path: 'lists',
					options: { sort: { created_at: 1 } },
					populate: {
						path: 'cards',
						options: { sort: { created_at: 1 } }
					}
				});
			}
			else {
				populate.push({
					path: 'lists',
					options: { sort: { created_at: 1 } },
				});
			}
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
