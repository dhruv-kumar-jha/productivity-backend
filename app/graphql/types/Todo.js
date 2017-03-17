'use strict';

const GraphQL = require('graphql');
const GraphQLField = require('app/global/graphql/fields');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLBoolean,
} = GraphQL;


const CardType = new GraphQL.GraphQLObjectType({
	name: 'Todo',
	description: 'List of all the todos present in the card.',

	fields: () => ({
		_card: {
			type: GraphQLID,
			description: 'ID of the card to which this todo item belongs to',
		},
		_id: {
			type: GraphQLID,
			description: 'ID of this todo',
		},
		title: {
			type: GraphQLString,
			description: 'Title of the Todo',
		},
		description: {
			type: GraphQLString,
			description: 'Description of the todo',
		},
		completed: {
			type: GraphQLBoolean,
			description: 'Whether this todo is completed',
		},

	})

});


module.exports = CardType;

