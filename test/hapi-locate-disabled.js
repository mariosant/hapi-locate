const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');

const routes = require('../fixtures/routes');

const lab = exports.lab = Lab.script();

const server = new Hapi.Server();
server.connection({port: 3000});

lab.experiment('hapi-locate disabledByDefault registration', () => {
	lab.before(done => {
		server.register({
			register: require('../index'),
			options: {disabledByDefault: true}
		}, err => {
			done(err);
		});
	});

	lab.test('the plugin should not work without any options', done => {
		server.route(routes.NO_OPTIONS);

		const options = {
			url: routes.NO_OPTIONS.path,
			method: routes.NO_OPTIONS.method
		};

		server.inject(options, response => {
			const payload = JSON.parse(response.payload || '{}');

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(Object.keys(payload)).not.to.contain(['ip', 'hostname']);

			done();
		});
	});

	lab.test('test if the plugin works when config passed', done => {
		server.route(routes.ENABLED);

		const options = {
			url: routes.ENABLED.path,
			method: routes.ENABLED.method
		};

		server.inject(options, response => {
			const payload = JSON.parse(response.payload || '{}');

			Code.expect(response.statusCode).to.equal(200);
			Code.expect(Object.keys(payload)).to.contain(['ip', 'hostname']);

			done();
		});
	});
});
