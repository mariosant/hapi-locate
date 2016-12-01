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

Roadmap:

* Use api key for ipinfo.io
* Provide a way to enable/disable on specific routes on demand
* Customize available information

Feel free to submit feature requests and to report any issues.

