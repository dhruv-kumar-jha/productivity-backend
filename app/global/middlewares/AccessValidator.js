'use strict';

const Loka = require('loka');
const User = require('app/services/models/User');
const jwt = require('jsonwebtoken');
const config = require('app/global/config');
const Response = require('app/global/helpers/Response');

module.exports = ( req, res, next ) => {

	// incase we add different routes and dont want to run this middleware when they are accessed.
	const ignoredRoutes = [
		'/',
	];

	// these can be accessed by users without logging in.
	const publicOperations = [
		'Login',
		'Signup',
		'Logout',
		'PublicBoard',
	];



	// if the route is present in the ignoredRoutes, just return next.
	if ( ignoredRoutes.includes(req.path) ) {
		return next();
	}


	let operationName = '';
	if ( req.body && req.body.operationName ) { operationName = req.body.operationName; }

	// if the GraphQL operation is not present in publicOperations
	if( ! publicOperations.includes(operationName) ) {

		const authorization_header = req.headers.authorization;
		let token;
		if ( authorization_header ) { token = authorization_header.split(" ")[1]; }

		if ( token ) {

			// reset the user data, for every request.
			Loka.set('user', {});

			jwt.verify( token, config.server.WEB_TOKEN_SECRET, (err, decoded_user) => {

				if ( err ) {
					if ( err.name === 'TokenExpiredError' ) {
						// throw new Error('Your token has expired. please login again to generate new token.');
						res.json( Response.error(401, 'Unauthorized', 'Your token has expired. please login again to generate new token.') );
					} else {
						res.json( Response.authError() );
					}
				}
				else {
					User.findById( decoded_user.id, (error, user) => {
						if (error) {
							res.json( Response.authError() );
						} else {
							req.user = user; // just incase we decide to access current user info from req object
							Loka.set('user', user); // setting it using loka, so this can be accessed from other files.
							next();
						}
					});
				}

			});

		} else {

			return res.json({
				code: 400,
				error: true,
				message: 'Authentication error occoured, you must be logged in to access the server.'
			});

		}

	} else {
		// we don't need to validate the token as this doesnt require user to be authenticated.
		next();
	}


};
