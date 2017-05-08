'use strict';

const GraphQL = require('graphql');
const {
	GraphQLList,
} = GraphQL;

const GraphQLHelper = require('app/global/graphql/helpers');
const GroupType = require('../types/Group');
const GroupResolver = require('../resolvers/Group');


module.exports = {

	index() {
		return {
			type: new GraphQLList(GroupType),
			description: 'This will return all the groups created by the logged in user',
			resolve(parent, args, context, info) {
				const populate = GraphQLHelper.getListPopulate(info);
				return GroupResolver.index({ populate });
			}
		}
	},

};

