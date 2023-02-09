import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  auth: {}
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  LOGIN: (state, member) => (
    state.auth = member
  )
}

export const getters: GetterTree<RootState, RootState> = {
  auth: (state) => {
    return state.auth
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async login ({ commit }, { data }) {
    const res = await this.$axios.$post('/auth', data)
    console.log(res)
    commit('LOGIN', res.data)
  }
}
