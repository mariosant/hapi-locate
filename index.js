const axios = require('axios');

const register = function (server, registrationOptions, next) {
	const options = {
		disabledByDefault: false
	};

	Object.assign(options, registrationOptions);

	server.ext('onPreHandler', function (request, reply) {
		const requestSettings = request.route.settings.plugins.hapiLocate || {};
		let shouldWork = !options.disabledByDefault;

		if (typeof requestSettings.enabled !== 'undefined') {
			shouldWork = requestSettings.enabled;
		}

		if (shouldWork) {
			axios.get('https://ipinfo.io')
				.then(response => {
					request.location = response.data;
					reply.continue();
				})
				.catch(err => {
					request.location = {error: err.code};
				});
		} else {
			reply.continue();
		}
	});

	return next();
};

register.attributes = {
	pkg: require('./package.json')
};

module.exports = register;
