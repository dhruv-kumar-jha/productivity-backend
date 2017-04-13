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


const UserType = new GraphQL.GraphQLObjectType({
	name: 'User',
	description: 'List of all the users that belongs to your organization.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the user, Generated automatically by MongoDB',
		},
		name: {
			type: GraphQLString,
			description: 'Full name of the user',
		},
		email: {
			type: GraphQLString,
			description: 'Email address of the user, must be valid and unique',
		},
		language: {
			type: GraphQLString,
			description: 'Language specified by the user',
		},

		phone: {
			type: GraphQLString,
			description: 'Phone number of the user',
		},
		dob: {
			type: GraphQLString,
			description: 'Date of birth of the user',
		},
		gender: {
			type: GraphQLInt,
			description: 'Gender of the user, un-specified by default',
		},
		meta: {
			type: GraphQLMixed,
			description: 'Meta information about the user',
		},

		status: GraphQLField.status(),
		created_at: GraphQLField.created_at({ description: 'Date and time when this users account was created' }),
		updated_at: GraphQLField.updated_at({ description: 'Date and time when this users account was last updated' }),

	})

});


module.exports = UserType;

