'use strict';

const GraphQL = require('graphql');
const GraphQLMixed = require('app/global/graphql/types/GraphQLMixed');
const GraphQLField = require('app/global/graphql/fields');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
} = GraphQL;

const UserType = require('../types/User');
const ListType = require('../types/List');


const BoardType = new GraphQL.GraphQLObjectType({
	name: 'Board',
	description: 'List of all the boards added by the current user.',

	fields: () => ({
		_user: {
			type: GraphQLID,
			description: 'ID of the user',
		},
		id: {
			type: GraphQLID,
			description: 'ID of this board',
		},
		title: {
			type: GraphQLString,
			description: 'This is the title of the board',
		},
		description: {
			type: GraphQLString,
			description: 'This is the boards description',
		},
		group: {
			type: GraphQLString,
			description: 'Group in which this board belongs to',
		},
		meta: {
			type: GraphQLMixed,
			description: 'Meta information about this board',
		},

		positions: {
			type: new GraphQLList(GraphQLID),
			description: 'Array containing list ids in sorted order',
		},

		user: {
			type: UserType,
			description: 'Details about the user',
		},

		lists: {
			type: new GraphQLList(ListType),
			description: 'List of all the lists that belong to this board',
		},


		status: GraphQLField.status(),
		created_at: GraphQLField.created_at({ description: 'Date and time when this board was created' }),
		updated_at: GraphQLField.updated_at({ description: 'Date and time when this board was last updated' }),

	})

});


module.exports = BoardType;

