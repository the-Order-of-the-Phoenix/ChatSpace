import Router from 'koa-router';
import koa from 'koa'

import model from '../schema'
import { BaseError } from '../entity';
import { Types } from 'mongoose';

export const sendMessage = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {

}

export const getMessage = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  console.log(ctx.query);
  ctx.throw(new BaseError(200, 'ok'))
}

export const deleteMessage = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {

}
