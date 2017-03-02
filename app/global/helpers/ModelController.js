'use strict';

const Loka = require('loka');


class ModelController {

	constructor(model) {
		this.model = model;
		this.store = Loka.store();
	}


	index(options, conditions={}) {
		return this.model.find(conditions)
			.populate(options.populate)
			.sort('created_at')
			.exec()
			.then( records => {
				return records;
			})
			.catch( error => {
				return error;
			});
	}


	single(options) {
		return this.model.findById(options.id)
			.populate(options.populate)
			.exec()
			.then( record => {
				return record;
			})
			.catch( error => {
				return error;
			});
	}


	create(data) {
		const record = new this.model(data);
		return record.save()
			.then( (record) => {
				return record;
			})
			.catch( (error) => {
				return error;
			});
	}






	update(data, conditions) {
		const findConditions = conditions ? conditions : { _id: data.id };
		return this.model.findOne(findConditions)
			.exec()
			.then( record => {
				if ( record ) {
					Object.keys(data).map( field => {
						if ( field != 'id' ) {
							record[field] = data[field];
						}
					});

					return record.save()
						.then( updated => {
							return updated;
						})
						.catch( (error) => {
							return error;
						});
				}
			})
			.catch( (error) => {
				return error;
			});


	}







}

module.exports = ModelController;
