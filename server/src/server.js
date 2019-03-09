import Koa from 'koa';
import logger from 'koa-logger';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static'

import getRouter from './controller'
import * as dao from './dao'

const app = new Koa();
const router = getRouter();
const staticRoot = serve('../front/dist')

console.log(__dirname)

dao.init()

app.use(bodyParser());
app.use(router.routes());
app.use(session(app))
app.use(logger())
app.use(staticRoot)

app.listen(3000);

app.on('error', async (err, ctx) => {
    console.error(err);
})

console.log('Server running on port 3000');
