const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');

const lab = exports.lab = Lab.script();

const server = new Hapi.Server();
server.connection({port: 3000});

server.route({
	path: '/',
	method: 'GET',
	handler: function (request, reply) {
		reply(request.location);
	}
});

lab.experiment('locate', () => {
	lab.before(done => {
		server.register([require('../index')], err => {
			done(err);
		});
	});

	lab.test('test if the plugin works', done => {
		const options = {
			url: '/',
			method: 'GET'
		};

		server.inject(options, response => {
			const payload = JSON.parse(response.payload);

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(Object.keys(payload)).to.contain(['ip', 'hostname']);
			done();
		});
	});
});
