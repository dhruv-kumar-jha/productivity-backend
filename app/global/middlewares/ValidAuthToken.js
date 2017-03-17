'use strict';

const Loka = require('loka');
const User = require('app/services/models/User');
const jwt = require('jsonwebtoken');
const config = require('app/global/config');
const Response = require('app/global/helpers/Response');

module.exports = ( req, res, next ) => {

	const ignored_routes = [
		'/auth',
		'/auth/register',
	];

	// we wont be using route paths, as we're using graphql, so make necessary changes here.
	if( req.method === 'POST' && ! ignored_routes.includes(req.path) ) {
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
							setTimeout( () => { next(); }, 1000);
						}
					});
				}
			});

		} else {
			next();
		}

	}
	else {
		// no auth token validation required.
		next();
	}


};
