'use strict';

const GraphQL = require('graphql');

const GraphQLMixed = new GraphQL.GraphQLScalarType({
	name: 'Mixed',
	serialize: value => value,
	parseValue: value => value,
	parseLiteral: ast => ast.value
});

module.exports = GraphQLMixed;
