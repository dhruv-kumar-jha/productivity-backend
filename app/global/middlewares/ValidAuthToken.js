'use strict';

const Loka = require('loka');
const User = require('app/services/models/User');
const jwt = require('jsonwebtoken');
const config = require('app/global/config');
const Response = require('app/global/helpers/Response');

module.exports = ( req, res, next ) => {


	// incase we add different routes and dont want to run this middleware when they are accessed.
	const ignored_routes = [
	];

	// these can be accessed by users without logging in.
	const publicOperations = [
		'Login',
		'Signup',
		'Logout',
		'PublicBoard',
	];


	// we wont be using route paths, as we're using graphql, so make necessary changes here.
	if( ! ignored_routes.includes(req.path) ) {
		// we need to validate users auth token

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
							// setTimeout( () => { next(); }, 1000); // using this to manually delay the response.
						}
					});
				}
			});

		} else {

			if ( req.method === 'POST' ) {

				const operationName = req.body.operationName;

				// if ( operationName === 'Login' || operationName === 'Signup' || operationName === 'Logout' ) {
				if ( publicOperations.includes(operationName) ) {
					next();
				} else {
					return res.json({ code: 400, error: true, message: 'Authentication error occoured, you must be logged in to access the server.' });
				}

			} else {
				return res.json({ code: 400, error: true, message: 'authentication error occoured, you must be logged in to access the server.' });
			}

		}

	}
	else {
		// no auth token validation required.
		next();
	}


};
