import * as types from "../types";
import storageService from "@/services/storageService";

const state = {
  messages: new Map()
};

const actions = {
  sendMessage({ commit }, message, receiver, socket) {
    
  }
};

const getters = {
  messages: state => state.messages,
};

const mutations = {
};

export default {
  state,
  actions,
  getters,
  mutations
};
