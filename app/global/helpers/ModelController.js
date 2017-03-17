'use strict';

const Loka = require('loka');
const _  = require('lodash');

class ModelController {

	constructor(model) {
		this.model = model;
		this.store = Loka.store();
	}


	transform(records) {
		if ( this._transform ) {
			if ( Array.isArray(records) ) {
				records.map( record => {
					record = this._transform(record);
				});
				return records;
			}
			else {
				return this._transform(records);
			}
		}
		return records;
	}


	index(options, conditions={}) {
		return this.model.find(conditions)
			.populate(options.populate)
			.sort('created_at')
			.exec()
			.then( records => {
				return this.transform(records);
			})
			.catch( error => {
				return error;
			});
	}


	single( options, conditions={} ) {
		const findConditions = conditions ? conditions : { _id: options.id };
		return this.model.findOne(findConditions)
			.populate(options.populate)
			.exec()
			.then( record => {
				return this.transform(record);
			})
			.catch( error => {
				return error;
			});
	}


	create(data) {
		const record = new this.model(data);
		return record.save()
			.then( (record) => {
				return this.transform(record);
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
					// console.log('data',data, 'record',record);
					Object.keys(data).map( field => {
						if ( field != 'id' ) {
							if ( record[field] && record[field].constructor === Object ) {
								if ( field === '_list' ) {
									record[field] = data[field];
								} else {
									const updated = Object.assign( {}, record[field], data[field] );
									record[field] = updated;
								}
							} else {
								record[field] = data[field];
							}
						}
					});

					return record.save()
						.then( updated => {
							return this.transform(updated);
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



	findOne( options, populate=[] ) {
		return this.model.findOne(options)
			.populate(populate)
			.exec()
			.then( record => {
				return this.transform(record);
			})
			.catch( error => {
				return error;
			});
	}


	delete( data ) {
		// this.model.findByIdAndRemove( data.id ).exec();
		// return data;

		this.model.findById(data.id)
			.exec()
			.then( record => {
				record.remove();
			})
			.catch( error => {
				return error;
			});

		return Object.assign( {}, data, { status: 10 } );

	}







}

module.exports = ModelController;

/*

					Object.keys(data).map( field => {
						if ( field != 'id' ) {
							if ( _.isObject( record[field] ) ) {
								if ( record[field].constructor === Array ) {
									record[field] = data[field];
								} else {
									const updated = Object.assign( {}, record[field], data[field] );
									record[field] = updated;
								}
							} else {
								record[field] = data[field];
							}
						}
					});

 */