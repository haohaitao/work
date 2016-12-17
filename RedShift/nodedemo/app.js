const Koa = require('koa');

const fs = require('fs');

const path = require('path');

const app = new Koa();

app.use(async(ctx, next) => {
    await next();

    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello RedShift!</h1>';
});

app.listen(8080, function() {
    console.log('app started at port 8080');
});