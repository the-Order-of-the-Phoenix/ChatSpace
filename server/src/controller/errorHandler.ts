import * as koa from 'koa'

const errorHandler = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.code || 500;
    ctx.response.body = {
      message: err.message,
      code: err.code
    };
  }
}