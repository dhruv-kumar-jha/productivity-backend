'use strict';

const GraphQL = require('graphql');
const GraphQLMixed = require('app/global/graphql/types/GraphQLMixed');
const GraphQLField = require('app/global/graphql/fields');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
} = GraphQL;


const CardType = new GraphQL.GraphQLObjectType({
	name: 'Card',
	description: 'List of all the cards that have been added by the logged in user.',

	fields: () => ({
		_list: {
			type: GraphQLID,
			description: 'ID of the list',
		},
		id: {
			type: GraphQLID,
			description: 'ID of this card',
		},
		title: {
			type: GraphQLString,
			description: 'Title of the card',
		},
		description: {
			type: GraphQLString,
			description: 'Description of the card',
		},
		position: {
			type: GraphQLInt,
			description: 'Position of the card',
		},

		status: GraphQLField.status(),
		created_at: GraphQLField.created_at({ description: 'Date and time when this card was created' }),
		updated_at: GraphQLField.updated_at({ description: 'Date and time when this card was last updated' }),

	})

});


module.exports = CardType;

