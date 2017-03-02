'use strict';

const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const config = require('app/global/config');
const mongoose = require('mongoose');

const ValidAuthTokenMiddleware = require('app/global/middlewares/ValidAuthToken');

const expressGraphQL = require('express-graphql');
const GraphQLSchema = require('app/graphql');

mongoose.Promise = require('bluebird');
mongoose.connect( process.env.DATABASE_HOST || config.database.HOST );



const app = express();

app.set( 'port', process.env.PORT || config.server.PORT );
app.disable('x-powered-by');

app.use( cors({ optionsSuccessStatus: 200 }) );
app.use( body_parser.json({ limit: '50mb' }) );
app.use( body_parser.urlencoded({ limit: '50mb', extended: true }) );

// make sure all the requests are made by authenticated users.
app.use( ValidAuthTokenMiddleware );


// disable in production., so other users cant access the graphiql ui
app.use(
	'/graphql',
	expressGraphQL( () => {
		return {
			graphiql: true,
			schema: GraphQLSchema,
		}
	})
);

app.get( '/', (req, res) => {
	res.json({ code: 200, online: true, message: 'success' });
});


module.exports = app;

