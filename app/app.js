'use strict';

const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const config = require('app/global/config');
const mongoose = require('mongoose');

const AccessValidatorMiddleware = require('app/global/middlewares/AccessValidator');

const expressGraphQL = require('express-graphql');
const GraphQLSchema = require('app/graphql');

mongoose.Promise = require('bluebird');
mongoose.connect( config.database.HOST );



const app = express();

app.set( 'port', config.server.PORT );
app.disable('x-powered-by');

app.use( cors({ optionsSuccessStatus: 200 }) );
app.use( body_parser.json({ limit: '50mb' }) );
app.use( body_parser.urlencoded({ limit: '50mb', extended: true }) );

// make sure all the requests are made by authenticated users.
app.use( AccessValidatorMiddleware );


// disable graphiql in production., so other users cant access the graphiql ui
app.use(
	'/graphql',
	expressGraphQL( () => {
		return {
			graphiql: false,
			schema: GraphQLSchema,
		}
	})
);

app.get( '/', (req, res) => {
	res.json({
		code: 200,
		online: true,
		message: 'success',
		description: 'Welcome, this is the backend for the productivity application.'
	});
});


module.exports = app;

