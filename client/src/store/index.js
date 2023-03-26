import { createStore } from 'vuex'
import service from '../request/service'
export default createStore({
  state: {
    isAdmin: localStorage.getItem('isAdmin') || 0,
    msgList: [],
    recipientList: []
  },
  getters: {},
  mutations: {
    getMsgList(state, data) {
      state.msgList = data
    },
    getRecipientList(state, data) {
      state.recipientList = data
    },
    setIsAdmin(state, data) {
      state.isAdmin = data
    }
  },
  actions: {
    getMsgList(context) {
      service.post('msg/list', { id: props.id }).then((res) => {
        if (res && res.status == 200) {
          context.commit('increment', res.data)
        }
      })
    },
    getRecipientList(context) {
      service.post('recipient/list', { id: props.id }).then((res) => {
        if (res && res.status == 200) {
          context.commit('increment', res.data)
        }
      })
    },
    setIsAdmin(context) {
      const is = localStorage.getItem('isAdmin')
      context.commit('setIsAdmin', is)
    }
  },
  modules: {}
})
