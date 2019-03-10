import koa from 'koa'
import { BaseError } from '../entity'

const errorHandler = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.code || err.status || err.statusCode || 500
    ctx.response.body = {
      message: err.message,
      code: err.code
    }

    if (!(err instanceof BaseError)) {
      ctx.app.emit('error', err, ctx)
    }
  }
}

export default errorHandler