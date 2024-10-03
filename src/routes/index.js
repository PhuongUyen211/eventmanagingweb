const siteRouter = require('./site');
const signRouter = require('./sign');
const eventRouter = require('./event');
const commentRouter = require('./comment');


function route(app) {
    app.use('/comment', commentRouter);
    app.use('/event', eventRouter);
    app.use('/sign', signRouter);
    app.use('/', siteRouter);
}

module.exports = route;
