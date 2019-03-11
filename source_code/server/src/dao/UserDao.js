import mongoose from 'mongoose'
import { User } from '../schema'
import * as type from '../type'

export const findUser = async (user: type.user)  => {
  return User.find(user)
}

export const deleteUser = async (user: type.user) => {

}

export const updateUser = async (user: type.user) => {

}

export const addUser = async (user: type.user) => {

}