'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLSchema,
} = GraphQL;


const AuthMutation = require('./mutations/Auth');
const AuthQuery = require('./queries/Auth');

const UserQuery = require('./queries/User');
const UserMutation = require('./mutations/User');

const BoardQuery = require('./queries/Board');
const BoardMutation = require('./mutations/Board');

const ListQuery = require('./queries/List');
const ListMutation = require('./mutations/List');

const CardQuery = require('./queries/Card');
const CardMutation = require('./mutations/Card');






const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'This is the default root query provided by the backend',
	fields: {
		users: UserQuery.index(),
		user: UserQuery.single(),
		current_user: UserQuery.current(),

		logout: AuthQuery.logout(),

		boards: BoardQuery.index(),
		board: BoardQuery.single(),

		lists: ListQuery.index(),
		list: ListQuery.single(),

		cards: CardQuery.index(),
		card: CardQuery.single(),
	},
});

const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Default mutation provided by the backend APIs',
	fields: {
		signup: AuthMutation.signup(),
		login: AuthMutation.login(),

		addUser: UserMutation.create(),
		updateUser: UserMutation.update(),

		addBoard: BoardMutation.create(),
		updateBoard: BoardMutation.update(),
		updateListPositions: BoardMutation.updateListPositions(),
		deleteBoard: BoardMutation.delete(),


		addList: ListMutation.create(),
		updateList: ListMutation.update(),
		deleteList: ListMutation.delete(),
		updateCardPositions: ListMutation.updateCardPositions(),

		addCard: CardMutation.create(),
		updateCard: CardMutation.update(),
		updateCardList: CardMutation.updateCardList(),
		deleteCard: CardMutation.delete(),

		addTodo: CardMutation.addTodo(),
		updateTodo: CardMutation.updateTodo(),
		deleteTodo: CardMutation.deleteTodo(),


	},
});




// export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});

