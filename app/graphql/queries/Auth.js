'use strict';

const GraphQL = require('graphql');
const {
	GraphQLID,
} = GraphQL;

const AuthResolver = require('../resolvers/Auth');

const UserLogoutType = new GraphQL.GraphQLObjectType({
	name: 'UserLogout',
	description: 'User Logout',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the logged out user',
		}
	})

});


module.exports = {

	logout() {
		return {
			type: UserLogoutType,
			description: 'This will return the id of the logged out user',
			resolve(parent, args, context, info) {
				return AuthResolver.logout();
			}
		}
	},


};

