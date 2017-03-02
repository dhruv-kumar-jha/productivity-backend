'use strict';

const GraphQL = require('graphql');

module.exports = {

	created_at( data={} ) {
		return {
			type: GraphQL.GraphQLString,
			description: data.description || 'Date and time when this record was added',
		}
	},

	updated_at( data={} ) {
		return {
			type: GraphQL.GraphQLString,
			description: data.description || 'Date and time when this record was last updated',
		}
	},

	status( data={} ) {
		return {
			type: GraphQL.GraphQLInt,
			description: data.description || 'Current status, whether active or disabled',
		}
	},

};
