const siteRouter = require('./site');
const signRouter = require('./sign');
const eventRouter = require('./event');
const commentRouter = require('./comment');
const userRouter = require('./user');

function route(app) {
    app.use('/user', userRouter);
    app.use('/comment', commentRouter);
    app.use('/event', eventRouter);
    app.use('/sign', signRouter);
    app.use('/', siteRouter);
}

module.exports = route;
