'use strict';

const Response = {

	general( data ) {
		return data;
	},

	error(code, message, description) {
		return {
			code: code || 400,
			message: message || 'some error occoured',
			description: description || 'error occoured on server, please try again after some time.',
		}
	},


	authError() {
		return Response.error(
			403,
			'authentication error',
			'no authentication token provided, please login first and provide the authentication token.'
		);
	},



}

module.exports = Response;

/*
'use strict';

let Response = {

	general( data ) {
		return data;
	},

	error(code, message, description) {
		return {
			code: code || 400,
			message: message || 'some error occoured',
			description: description || 'error occoured on server, please try again after some time.',
		}
	},

	databaseError(error) {
		return Response.error(
			403,
			'database error occoured',
			error
		);
	},

	noDeletePermissions() {
		return Response.error(
			404,
			'permission denied',
			"You don't have the required permissions to delete records."
		);
	},

	databaseRecordNotFound() {
		return Response.error(
			404,
			'record fot found',
			"The record you tried to access doesn't exist or you don't have permissions to access it."
		);
	},


	authError() {
		return Response.error(
			403,
			'authentication error',
			'no authentication token provided, please login first and provide the authentication token.'
		);
	},

	emptyContent() {
		return Response.general({
			code: 402,
			message: 'empty content found',
			description: 'you must provide valid data and it must not be empty.',
			helpful_links: [ 'http://stackoverflow.com/questions/18419428/what-is-the-minimum-valid-json' ]
		});
	},


	invalidContentType() {
		return Response.general({
			code: 400,
			message: 'invalid content type',
			description: 'you must specify content type and it must be application/json',
			helpful_links: [ 'http://stackoverflow.com/questions/477816/what-is-the-correct-json-content-type' ]
		});
	},


	routeNotFound() {
		return Response.error(
			405,
			'resource not found',
			'the resource your tried to access doesn\'t exist or you dont have permissions to access it.'
		);
	},

	userNotFound() {
		return Response.error(
			400,
			'user not found',
			"the user you're looking for doesn't exist or you dont have permissions to access it."
		);
	},


	updateErrorOccoured(error) {
		return Response.error(
			301,
			'error occoured',
			error || "error occoured while updating your data."
		);
	},



	deleteErrorOccoured(error) {
		return Response.error(
			301,
			'error occoured',
			error || "error occoured while deleting the data."
		);
	},



	success(description, data=null) {
		return {
			code: 200,
			message: 'success',
			description: description || 'data successfully saved.',
			...data
		}
	},



	default( data ) {
		return {
			code: 200,
			message: 'success',
			...data
		}
	}




}

export default Response;

 */

