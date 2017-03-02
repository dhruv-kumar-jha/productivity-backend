'use strict';

const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull,
} = GraphQL;

const GraphQLHelper = require('app/global/graphql/helpers');
const UserType = require('../types/User');
const UserResolver = require('../resolvers/User');


module.exports = {

	index() {
		return {
			type: new GraphQLList(UserType),
			description: 'This will return all the users present in the database, Paginated',
			resolve(parent, args, context, info) {
				const populate = GraphQLHelper.getUserPopulate(info);
				return UserResolver.index({ populate });
			}
		}
	},

	single() {
		return {
			type: UserType,
			description: 'This will return data of a single users based on the ID provided',
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Please enter ID of the User',
				}
			},
			resolve(parent, args, context, info) {
				const populate = GraphQLHelper.getUserPopulate(info);
				return UserResolver.single({ id: args.id, populate });
			}
		}
	},


	current() {
		return {
			type: UserType,
			description: 'This will return the details about the authenticated user making this request.',
			resolve(parent, args, context, info) {
				return UserResolver.current({ user: context.user });
			}
		}
	},



};

