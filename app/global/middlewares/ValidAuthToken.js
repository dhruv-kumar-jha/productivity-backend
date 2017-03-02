'use strict';

const Loka = require('loka');

module.exports = ( req, res, next ) => {

	const ignored_routes = [
		'/auth',
		'/auth/register',
	];

	// we wont be using route paths, as we're using graphql, so make necessary changes here.


	if( req.method === 'POST' && ! ignored_routes.includes(req.path) ) {
		// we need to validate users auth token

		// fetch the user details directly from the token, specified in Header
		// if token not specied, return an error back to the user.

		const current_user = {
			id: "58b7d6b36ffc5d0f1c2feedc", // 58b7f7473294da15483b7b9a
			name: "John Doe",
			email: "john.doe@gmail.com"
		};

		req.user = current_user; // just incase we decide to access current user info from req object
		Loka.set('user', current_user); // setting it using loka, so this can be accessed from other files.

		next();

	}
	else {
		// no auth token validation required.
		next();
	}


};
