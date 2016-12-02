Hapi-Locate
===========

[![wercker status](https://app.wercker.com/status/eaed1e7ba08a56173b31624dc1d1c3f8/s/master "wercker status")](https://app.wercker.com/project/byKey/eaed1e7ba08a56173b31624dc1d1c3f8)

A simple plugin to provide `request.location`.

Usage:

```javascript
server.register([require('hapi-locate')], err => {
    done(err);
});

// and later in a handler
function (request, reply) {
    request.location // Do something with this
    reply('OK');
}
```

There is good chance you won't want to do that for every single route, so there are two ways to load it on demand.

First way:
```javascript
server.register({
    register: require('hapi-locate'),
    options: {
        disableByDefault: true
    }
}, err => {
    done(err);
});

// and later in a route
const route = {
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
```

Second way:
```javascript
server.register({
    register: require('hapi-locate'),
}, err => {
    done(err);
});

// and later in a route
const route = {
    path: '/',
	method: 'GET',
	handler: function (request, reply) {
		reply();
	},
    config: {
        plugins: {
            hapiLocate: {
                enabled: false
            }
        }
    }
};
```

Roadmap:

* Use api key for ipinfo.io
* ~~Provide a way to enable/disable on specific routes on demand~~
* Customize available information

Feel free to submit feature requests and to report any issues.

