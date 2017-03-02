'use strict';

const GraphQL = require('graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
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



};
