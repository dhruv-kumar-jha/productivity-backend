'use strict';

const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull,
} = GraphQL;

const GraphQLHelper = require('app/global/graphql/helpers');
const ListType = require('../types/List');
const ListResolver = require('../resolvers/List');


module.exports = {

	index() {
		return {
			type: new GraphQLList(ListType),
			description: 'This will return all the lists created by the logged in user',
			resolve(parent, args, context, info) {
				const populate = GraphQLHelper.getListPopulate(info);
				return ListResolver.index({ populate });
			}
		}
	},

	single() {
		return {
			type: ListType,
			description: 'This will return data of a single list based on Id, Created by the logged in user',
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Please enter ID of the List',
				}
			},
			resolve(parent, args, context, info) {
				const populate = GraphQLHelper.getListPopulate(info);
				return ListResolver.single({ id: args.id, populate });
			}
		}
	},



};

