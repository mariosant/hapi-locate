const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');

const routes = require('../fixtures/routes');

const lab = exports.lab = Lab.script();

const server = new Hapi.Server();
server.connection({port: 3000});

lab.experiment('hapi-locate disabledByDefault false registration', () => {
	lab.before(done => {
		server.register({
			register: require('../index'),
			options: {disabledByDefault: false}
		}, err => {
			done(err);
		});
	});

	lab.test('test if the plugin works without any options', done => {
		server.route(routes.NO_OPTIONS);

		const options = {
			url: routes.NO_OPTIONS.path,
			method: routes.NO_OPTIONS.method
		};

		server.inject(options, response => {
			const payload = JSON.parse(response.payload || '{}');

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(Object.keys(payload)).to.contain(['ip', 'hostname']);

			done();
		});
	});

	lab.test('test if the plugin disables when config passed', done => {
		server.route(routes.DISABLED);

		const options = {
			url: routes.DISABLED.path,
			method: routes.DISABLED.method
		};

		server.inject(options, response => {
			const payload = JSON.parse(response.payload || '{}');

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(Object.keys(payload)).not.to.contain(['ip', 'hostname']);

			done();
		});
	});
});
