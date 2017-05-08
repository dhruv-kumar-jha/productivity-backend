'use strict';

const GraphQL = require('graphql');
const GraphQLMixed = require('app/global/graphql/types/GraphQLMixed');
const GraphQLField = require('app/global/graphql/fields');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} = GraphQL;


const GroupType = new GraphQL.GraphQLObjectType({
	name: 'Group',
	description: 'List of all the groups that have been added by the logged in user.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of this group',
		},
		name: {
			type: GraphQLString,
			description: 'Name of the group',
		},
		description: {
			type: GraphQLString,
			description: 'Description of the group',
		},
		meta: {
			type: GraphQLMixed,
			description: 'Meta information related to this group',
		},

		status: GraphQLField.status(),
		created_at: GraphQLField.created_at({ description: 'Date and time when this group was created' }),
		updated_at: GraphQLField.updated_at({ description: 'Date and time when this group was last updated' }),

	})

});


module.exports = GroupType;

