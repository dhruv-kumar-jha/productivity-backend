'use strict';

const GraphQL = require('graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
	GraphQLList,
} = GraphQL;
const GraphQLMixed = require('app/global/graphql/types/GraphQLMixed');

const BoardType = require('../types/Board');
const BoardResolver = require('../resolvers/Board');

module.exports = {

	create() {
		return {
			type: BoardType,
			description: 'Add new Board',

			args: {
				title: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter board title',
				},
				description: {
					type: GraphQLString,
					description: 'Enter board description',
				},
			},
			resolve(parent, fields) {
				return BoardResolver.create(fields);
			}
		}
	},




	update() {
		return {
			type: BoardType,
			description: 'Update existing Board',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter board id',
				},
				title: {
					type: GraphQLString,
					description: 'Enter board title',
				},
				description: {
					type: GraphQLString,
					description: 'Enter board description',
				},
				meta: {
					type: GraphQLMixed,
					description: 'Enter board meta information',
				}
			},
			resolve(parent, fields) {
				return BoardResolver.update(fields);
			}
		}
	},



	updateListPositions() {
		return {
			type: BoardType,
			description: 'Update positions of the lists inside this board',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter board id',
				},
				positions: {
					type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
					description: 'Enter id of the lists in this board, In the sorted order',
				}
			},
			resolve(parent, fields) {
				return BoardResolver.updatePosition(fields);
			}
		}

	},





	delete() {
		return {
			type: BoardType,
			description: 'Delete existing board, its lists and cards',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter Board Id',
				},
			},
			resolve(parent, fields) {
				return BoardResolver.delete(fields);
			}
		}
	},




};
