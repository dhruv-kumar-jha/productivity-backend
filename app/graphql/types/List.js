'use strict';

const GraphQL = require('graphql');
const GraphQLMixed = require('app/global/graphql/types/GraphQLMixed');
const GraphQLField = require('app/global/graphql/fields');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
} = GraphQL;

const CardType = require('../types/Card');


const ListType = new GraphQL.GraphQLObjectType({
	name: 'List',
	description: 'List of all the lists that have been added by the logged in user.',

	fields: () => ({
		_board: {
			type: GraphQLID,
			description: 'ID of the board',
		},
		id: {
			type: GraphQLID,
			description: 'ID of this list',
		},
		title: {
			type: GraphQLString,
			description: 'Title of the list',
		},
		description: {
			type: GraphQLString,
			description: 'Description of the list',
		},
		meta: {
			type: GraphQLMixed,
			description: 'Meta information about this list',
		},

		positions: {
			type: new GraphQLList(GraphQLID),
			description: 'Array containing card ids in sorted order',
		},

		cards: {
			type: new GraphQLList(CardType),
			description: 'List of all the cards that belong to this list',
		},

		status: GraphQLField.status(),
		created_at: GraphQLField.created_at({ description: 'Date and time when this list was created' }),
		updated_at: GraphQLField.updated_at({ description: 'Date and time when this list was last updated' }),

	})

});


module.exports = ListType;

