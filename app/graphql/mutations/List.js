'use strict';

const GraphQL = require('graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
	GraphQLList,
} = GraphQL;

const ListType = require('../types/List');
const ListResolver = require('../resolvers/List');

module.exports = {

	create() {
		return {
			type: ListType,
			description: 'Add new List',

			args: {
				_board: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter board id',
				},
				title: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter list title',
				},
				description: {
					type: GraphQLString,
					description: 'Enter list description',
				},
			},
			resolve(parent, fields) {
				return ListResolver.create(fields);
			}
		}
	},


	update() {
		return {
			type: ListType,
			description: 'Add new List',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter list id',
				},
				title: {
					type: GraphQLString,
					description: 'Enter list title',
				},
				description: {
					type: GraphQLString,
					description: 'Enter list description',
				},
			},
			resolve(parent, fields) {
				return ListResolver.update(fields);
			}
		}
	},



	delete() {
		return {
			type: ListType,
			description: 'Delete existing List',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter list id',
				},
			},
			resolve(parent, fields) {
				return ListResolver.delete(fields);
			}
		}
	},


	updateCardPositions() {
		return {
			type: ListType,
			description: 'Update positions of the cards inside this list',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter list id',
				},
				positions: {
					type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
					description: 'Enter id of the cards in this list, In the sorted order',
				}
			},
			resolve(parent, fields) {
				return ListResolver.updatePosition(fields);
			}
		}

	},



};
