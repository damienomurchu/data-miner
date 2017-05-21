'use strict';

const app = require('./app');

let port = process.argv[1];

app.listen(port || 8000);
console.log('listening on http://localhost:' + port);
