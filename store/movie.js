const fetchData = require('../util/fetchData')

export const state = () => ({
  filterLayers: [],
  wholeData: null
})

export const mutations = {
  pushLayer: (state, layer) => {
    state.filterLayers.push(layer.op);
  },
  processData: (state) => {
    console.log("type= ", typeof state.wholeData)
    try {
      console.log("before = ", state.wholeData.length);
      for (let op of state.filterLayers) {
        state.wholeData = state.wholeData.filter(op);
      }
      console.log("after = ", state.wholeData.length);
    } catch (err) {
      console.log(err);
    }
  },
  prepareData: (state, data) => {
    state.wholeData = data;
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
    let data = await fetchData();
    context.commit("prepareData", data);   
    context.commit("processData");
  }

}