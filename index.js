const axios = require('axios');

const register = function (server, options, next) {
	server.ext('onRequest', function (request, reply) {
		axios.get('https://ipinfo.io')
			.then(response => {
				request.location = response.data;
				reply.continue();
			});
	});

	return next();
};

register.attributes = {
	pkg: require('./package.json')
};

module.exports = register;
