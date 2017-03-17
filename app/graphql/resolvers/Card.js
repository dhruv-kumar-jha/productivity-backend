'use strict';

const Card = require('app/services/models/Card');
const ModelController = require('app/global/helpers/ModelController');

const ListController = require('./List');

class CardController extends ModelController {

	constructor(model) {
		super(model);
	}


	updateCardList(data) {
		if ( data._list_positions ) {
			ListController.updatePosition({ id: data._list, positions: data._list_positions });
			return super.update(data);
		}
		return super.update(data);
	}

	addTodo(fields) {
		return this.model.findOne({ _id: fields._card })
			.exec()
			.then( record => {
				const new_item = record.todos.create({ title: fields.title, description: fields.description, completed: false });
				record.todos.push(new_item);

				return record.save()
					.then( updated => {
						return new_item;
					})
					.catch( (error) => {
						return error;
					});

			})
			.catch( error => {
				return error;
			});
	}



	updateTodo(fields) {
		return this.model.findOne({ _id: fields._card })
			.exec()
			.then( record => {
				const todo = record.todos.id(fields._id);
				todo.title = fields.title || todo.title;
				todo.description = fields.description || todo.description;
				if ( fields.completed === false ) { todo.completed = false; }
				else if ( fields.completed === true ) { todo.completed = true; }
				else { fields.completed = todo.completed }
				// todo.completed = fields.completed === false ? false : true;

				return record.save()
					.then( updated => {
						const todo = updated.todos.id(fields._id);
						return todo;
					})
					.catch( (error) => {
						return error;
					});

			})
			.catch( error => {
				return error;
			});

	}





	deleteTodo(fields) {
		return this.model.findOne({ _id: fields._card })
			.exec()
			.then( record => {
				const todo = record.todos.id(fields._id).remove();
				return record.save()
					.then( updated => {
						return fields;
					})
					.catch( (error) => {
						return error;
					});

			})
			.catch( error => {
				return error;
			});

	}





};

const controller = new CardController(Card);
module.exports = controller;

