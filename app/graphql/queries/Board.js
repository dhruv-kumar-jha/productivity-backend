'use strict';

const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull,
} = GraphQL;

const GraphQLHelper = require('app/global/graphql/helpers');
const BoardType = require('../types/Board');
const BoardResolver = require('../resolvers/Board');


module.exports = {

	index() {
		return {
			type: new GraphQLList(BoardType),
			description: 'This will return all the boards created by the logged in user',
			resolve(parent, args, context, info) {
				const populate = GraphQLHelper.getBoardPopulate(info);
				return BoardResolver.index({ populate });
			}
		}
	},

	single() {
		return {
			type: BoardType,
			description: 'This will return data of a single board based on Id, Created by the logged in user',
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Please enter ID of the Board',
				}
			},
			resolve(parent, args, context, info) {
				const populate = GraphQLHelper.getBoardPopulate(info);
				return BoardResolver.single({ id: args.id, populate });
			}
		}
	},



};

