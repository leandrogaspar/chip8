const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

const port = 3000;

app.use(serve(__dirname + '/src'));

app.listen(port);
console.log(`Listening on port ${port}`);
