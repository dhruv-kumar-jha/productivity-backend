'use strict';

const GraphQL = require('graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
	GraphQLList,
} = GraphQL;
const GraphQLMixed = require('app/global/graphql/types/GraphQLMixed');

const GroupType = require('../types/Group');
const GroupResolver = require('../resolvers/Group');

module.exports = {

	create() {
		return {
			type: GroupType,
			description: 'Add new Group',

			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter group name',
				},
				description: {
					type: GraphQLString,
					description: 'Enter group description',
				},
			},
			resolve(parent, fields) {
				return GroupResolver.create(fields);
			}
		}
	},


	update() {
		return {
			type: GroupType,
			description: 'Update existing Group',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter group id',
				},
				name: {
					type: GraphQLString,
					description: 'Enter group name',
				},
				description: {
					type: GraphQLString,
					description: 'Enter group description',
				},
				meta: {
					type: GraphQLMixed,
					description: 'Enter group meta information',
				}
			},
			resolve(parent, fields) {
				return GroupResolver.update(fields);
			}
		}
	},



	delete() {
		return {
			type: GroupType,
			description: 'Delete existing Group',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter group id',
				},
			},
			resolve(parent, fields) {
				return GroupResolver.delete(fields);
			}
		}
	},




};
