'use strict';

const GraphQL = require('graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
} = GraphQL;

const CardType = require('../types/Card');
const CardResolver = require('../resolvers/Card');

module.exports = {

	create() {
		return {
			type: CardType,
			description: 'Add new Card',

			args: {
				_list: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter list id',
				},
				title: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter card title',
				},
				description: {
					type: GraphQLString,
					description: 'Enter card description',
				},
			},
			resolve(parent, fields) {
				return CardResolver.create(fields);
			}
		}
	},


	update() {
		return {
			type: CardType,
			description: 'Add new Card',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter card id',
				},
				title: {
					type: GraphQLString,
					description: 'Enter card title',
				},
				description: {
					type: GraphQLString,
					description: 'Enter card description',
				},
			},
			resolve(parent, fields) {
				return CardResolver.update(fields);
			}
		}
	},




};
