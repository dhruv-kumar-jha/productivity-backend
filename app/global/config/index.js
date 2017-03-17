'use strict';

module.exports = {

	server: {
		PORT: process.env.PORT || 1200,
		WEB_TOKEN_SECRET: process.env.SECRET_TOKEN || "B57J=7B`NQ$y98|~5;hc715bo09^5oz8NR+]n9r~215B91Nd9P%25_N6r!GHcOKp|18y5-73Dr5^@9k7n]5l<-41D1o",
	},

	database: {
		HOST: process.env.MONGODB || 'mongodb://127.0.0.1:27017/os_productivity_app',
	},


};
