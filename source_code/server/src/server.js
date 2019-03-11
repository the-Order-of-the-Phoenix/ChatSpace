import Koa from 'koa'
import logger from 'koa-logger'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import websockify from 'koa-websocket'

import getRouter from './controller'
import * as dao from './dao'
import errorHandler from "./controller/errorHandler"
import getWSRouter from './websocket'

const wsOptions = {}
const app = websockify(new Koa(), wsOptions)
const router = getRouter()
const wsRouter = getWSRouter()
const staticRoot = serve('../front/dist')

console.log(`server vfile root is ${__dirname}`)

dao.init()

app.keys = ['chat space key'];
const CONFIG = {
    key: 'koa:sess', /** cookie的名称，可以不管 */
    maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
};

app.use(logger())
app.use(errorHandler)
app.use(bodyParser())
app.use(router.routes())
app.use(session(CONFIG, app))
app.use(staticRoot)
app.ws.use(wsRouter.routes())


app.listen(3000);

app.on('error', async (err, ctx) => {
    console.error('error:', err)
})

console.log('Server running on port 3000');
