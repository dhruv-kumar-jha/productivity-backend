'use strict';

require('app-module-path/register');
const app = require('app/app.js');

// start the server
app.listen(
	app.get('port'),
	() => {
		const port = app.get('port');
		console.log(`backend api running at http://127.0.0.1:${port}` );
	}
);

