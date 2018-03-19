const state = {
  _sidebarStatus: null
};

// getters
const getters = {
  sidebarStatus: state => state._sidebarStatus
};

// actions
const actions = {
  sidebarStatus({ commit }, status) {
    commit("sidebaStatus", status);
  }
};

// mutations
const mutations = {
  setSidebarStatus(state, status) {
    state._sidebarStatus = status;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
