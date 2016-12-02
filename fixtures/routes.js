module.exports.NO_OPTIONS = {
	path: '/NO_OPTIONS',
	method: 'GET',
	handler: function (request, reply) {
		reply(request.location);
	}
};

module.exports.ENABLED = {
	path: '/',
	method: 'GET',
	handler: function (request, reply) {
		reply(request.location);
	},
	config: {
		plugins: {
			hapiLocate: {
				enabled: true
			}
		}
	}
};

module.exports.DISABLED = {
	path: '/',
	method: 'GET',
	handler: function (request, reply) {
		reply(request.location);
	},
	config: {
		plugins: {
			hapiLocate: {
				enabled: false
			}
		}
	}
};