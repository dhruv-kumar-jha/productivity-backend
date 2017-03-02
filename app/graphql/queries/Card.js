'use strict';

const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull,
} = GraphQL;

const GraphQLHelper = require('app/global/graphql/helpers');
const CardType = require('../types/Card');
const CardResolver = require('../resolvers/Card');


module.exports = {

	index() {
		return {
			type: new GraphQLList(CardType),
			description: 'This will return all the cards created by the logged in user',
			resolve(parent, args, context, info) {
				const populate = GraphQLHelper.getCardPopulate(info);
				return CardResolver.index({ populate });
			}
		}
	},

	single() {
		return {
			type: CardType,
			description: 'This will return data of a single card based on Id, Created by the logged in user',
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Please enter ID of the Card',
				}
			},
			resolve(parent, args, context, info) {
				const populate = GraphQLHelper.getCardPopulate(info);
				return CardResolver.single({ id: args.id, populate });
			}
		}
	},



};

