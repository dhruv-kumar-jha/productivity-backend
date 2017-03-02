'use strict';

const GraphQL = require('graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
	GraphQLObjectType,
} = GraphQL;

const UserMutation = require('./User');
const AuthResolver = require('../resolvers/Auth');
const GraphQLMixed = require('app/global/graphql/types/GraphQLMixed');



const UserAuthTokenType = new GraphQL.GraphQLObjectType({
	name: 'UserAuthToken',
	description: 'User Auth Token',

	fields: () => ({
		token: {
			type: GraphQLString,
			description: 'Authentication token of the logged in user',
		},
		error: {
			type: GraphQLMixed,
			description: 'Error information, if any',
		},
	})

});


module.exports = {

	signup: UserMutation.create,

	login() {
		return {
			type: UserAuthTokenType,
			description: 'Authenticate existing user',

			args: {
				email: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter users email address',
				},
				password: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter users password',
				},
			},

			resolve(parent, fields) {
				return AuthResolver.login(fields);
			}
		}
	},






};
