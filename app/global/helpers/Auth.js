'use strict';

const config = require('app/global/config');
const jwt = require('jsonwebtoken');

const UserHelper = {


	sign( data ) {
		return jwt.sign(
			data,
			config.server.WEB_TOKEN_SECRET,
			{
				expiresIn: '24h'
			}  // 10m, 24h, 60m
		);
	},

	generateToken( user ) {
		const token = UserHelper.sign({
			id: user.id,
			status: user.status,
			name: user.name,
		});
		return token;
	},




};


module.exports = UserHelper;
