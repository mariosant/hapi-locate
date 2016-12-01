Hapi-Locate
===========

A simple plugin to provide `request.geo`.

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

Roadmap:

* Use api key for ipinfo.io
* Provide a way to enable/disable on specific routes on demand
* Customize available information

Feel free to submit feature requests and to report any issues.

