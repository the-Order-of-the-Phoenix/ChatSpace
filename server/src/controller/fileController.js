import Router from 'koa-router';
import koa from 'koa'

import model from '../schema'
import { BaseError } from '../entity';
import { Types } from 'mongoose';

export const uploadFileSync = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  //

}

export const uploadAsync = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  //

}

export const getUploadStatus = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {

}

export const getFilePath = async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
  
}