'use strict';

const GraphQL = require('graphql');
const {
	GraphQLNonNull,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLBoolean,
} = GraphQL;
const GraphQLMixed = require('app/global/graphql/types/GraphQLMixed');

const CardType = require('../types/Card');
const TodoType = require('../types/Todo');

const CardResolver = require('../resolvers/Card');


module.exports = {

	create() {
		return {
			type: CardType,
			description: 'Add new Card',

			args: {
				_list: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter list id',
				},
				title: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter card title',
				},
				description: {
					type: GraphQLString,
					description: 'Enter card description',
				},
			},
			resolve(parent, fields) {
				return CardResolver.create(fields);
			}
		}
	},


	update() {
		return {
			type: CardType,
			description: 'Update existing Card',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter card id',
				},
				title: {
					type: GraphQLString,
					description: 'Enter card title',
				},
				description: {
					type: GraphQLString,
					description: 'Enter card description',
				},
				meta: {
					type: GraphQLMixed,
					description: 'Enter card meta information',
				}
			},
			resolve(parent, fields) {
				return CardResolver.update(fields);
			}
		}
	},

	delete() {
		return {
			type: CardType,
			description: 'Delete existing card',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter card id',
				},
			},
			resolve(parent, fields) {
				return CardResolver.delete(fields);
			}
		}
	},





	updateCardList() {
		return {
			type: CardType,
			description: 'Change the list in which this card belongs to',

			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter card id',
				},
				_list: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter new list id',
				},
				_list_positions: {
					type: new GraphQLList(GraphQLID),
					description: 'Enter the updated positions of cards present in the current list',
				},
			},
			resolve(parent, fields) {
				return CardResolver.updateCardList(fields);
			}
		}

	},











	addTodo() {
		return {
			type: TodoType,
			description: 'Add todo list',

			args: {
				_card: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter card id',
				},
				title: {
					type: new GraphQLNonNull(GraphQLString),
					description: 'Enter todo title',
				},
				description: {
					type: GraphQLString,
					description: 'Enter todo description',
				},
			},
			resolve(parent, fields) {
				return CardResolver.addTodo(fields);
			}
		}
	},



	updateTodo() {
		return {
			type: TodoType,
			description: 'Update todo item',

			args: {
				_card: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter card id',
				},
				_id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter todo id',
				},
				title: {
					type: GraphQLString,
					description: 'Enter todo title',
				},
				description: {
					type: GraphQLString,
					description: 'Enter todo description',
				},
				completed: {
					type: GraphQLBoolean,
					description: 'Whether this todo is completed or not',
				}
			},
			resolve(parent, fields) {
				return CardResolver.updateTodo(fields);
			}
		}
	},

	deleteTodo() {
		return {
			type: TodoType,
			description: 'Delete existing todo',

			args: {
				_card: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter card id',
				},
				_id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'Enter todo id',
				},
			},
			resolve(parent, fields) {
				return CardResolver.deleteTodo(fields);
			}
		}
	},






















};
