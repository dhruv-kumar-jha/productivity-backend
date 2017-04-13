'use strict';

const GraphQL = require('graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
} = GraphQL;

const UserType = require('../types/User');
const UserResolver = require('../resolvers/User');

module.exports = {

	create() {
		return {
			type: UserType,
			description: 'Add new User',

			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter users full name, Cannot be left empty',
				},
				email: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter users email address, Must be valid and unique',
				},
				password: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter users password, will be automatically hashed',
				},
				language: {
					type: GraphQLString,
					description: 'Enter users preferred language',
				},

				phone: {
					type: GraphQLString,
					description: 'Enter users phone number',
				},
				dob: {
					type: GraphQLString,
					description: 'Enter users date of birth, Format: YYYY-MM-DD',
				},
				gender: {
					type: GraphQLInt,
					description: 'Enter users gender, 1: Male, 2: Female, Default 0: not specified',
				},
				status: {
					type: GraphQLInt,
					description: 'Enters users status, by default its set to active',
				},
			},
			resolve(parent, fields) {
				return UserResolver.create(fields);
			}
		}
	},




	update() {
		return {
			type: UserType,
			description: 'Update user details',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter user id',
				},
				name: {
					type: GraphQLString,
					description: 'Enter users full name, Cannot be left empty',
				},
				email: {
					type: GraphQLString,
					description: 'Enter users email address, Must be valid and unique',
				},
				password: {
					type: GraphQLString,
					description: 'Enter users password, will be automatically hashed',
				},
				language: {
					type: GraphQLString,
					description: 'Enter users preferred language',
				},
				phone: {
					type: GraphQLString,
					description: 'Enter users phone number',
				},
				dob: {
					type: GraphQLString,
					description: 'Enter users date of birth, Format: YYYY-MM-DD',
				},
				gender: {
					type: GraphQLInt,
					description: 'Enter users gender, 1: Male, 2: Female, Default 0: not specified',
				},
			},
			resolve(parent, fields) {
				return UserResolver.update(fields);
			}
		}
	},





};
