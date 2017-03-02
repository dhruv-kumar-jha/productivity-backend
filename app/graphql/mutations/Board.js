'use strict';

const GraphQL = require('graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
} = GraphQL;

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
			},
			resolve(parent, fields) {
				return BoardResolver.update(fields);
			}
		}
	},



};
