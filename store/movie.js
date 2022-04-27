const fetchData = require('../util/fetchData')

export const state = () => ({
  filterLayers: [],
  wholeData: [],
  loading: false
})

export const mutations = {
  setLoading: (state, val) => {
    state.loading = val;
  },
  pushLayer: (state, layer) => {
    state.filterLayers.push(layer.op);
  },
  processData: (state) => {
    try {
      console.log("before=", state.wholeData.length);
      for (let op of state.filterLayers) {
        state.wholeData = state.wholeData.filter(op);
      }
      console.log("after=", state.wholeData.length);
      state.loading = false
    } catch (err) {
      console.log(err);
    }
  },
  prepareData: (state, data) => {
    state.wholeData = data;
  },

  resetData: (state) => {
    state.filterLayers = [],
    state.wholeData = []
  }
}

export const actions = {
  push: async (context, payload) => {
    context.commit("pushLayer", payload);
  },

  getData: async (context) => {
    let data = await fetchData();
    context.commit("prepareData", data);   
  },

  proc: async (context) => {
    context.commit("setLoading", true);
    let data = await fetchData();
    context.commit("prepareData", data);   
    context.commit("processData");
  },

  reset: async (context) => {
    context.commit("resetData");
  }

}