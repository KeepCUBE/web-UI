import * as api from '../../api/devices'

const state = {
  devices: [],
  newDevice: {
    name: '',
    type_id: null,
    room_id: null,
  }
}

const getters = {
  allDevices: state => state.devices,
  newDeviceData: state => state.newDevice,
  device: (state, getters) => (id) => { return state.devices[id] }
}

const actions = {
  getDevicesFromApi({ commit }) {
    api.getAllDevices((devices) => {
      commit('SET_DEVICES', {devices})
    })
  },
  newDeviceSetAttr({ commit }, {attr, val}) {
    if(attr in state.newDevice) {
      commit('UPDATE_NEW_DEVICE', { [attr]: val})
    } else {
      console.log(`Atribute ${attr} is not allowed.`)
    }
  },
  newDeviceSplash({ commit }) {
    if(state.newDevice.name && (state.newDevice.type_id || state.newDevice.type_id == 0)) {
      api.postNewDevice(state.newDevice, newDevice => {
        commit('ADD_DEVICE', newDevice)
      })
   }
  },
  removeDevice({ commit }, id) {
    api.deleteDevice(id, id => {
      commit('REMOVE_DEVICE', id)
    })
  }
}

const mutations = {
  SET_DEVICES(state, {devices}) {
    let reindexedDevices = {}
    devices.forEach((item) => {
     reindexedDevices[item.id] = item
    })
    state.devices = reindexedDevices
  },
  ADD_DEVICE(state, device) {
    Vue.set(state.devices, device.id, device)
    state.newDevice = {type_id: null, name: null}
  },
  REMOVE_DEVICE(state, key) {
    Vue.delete(state.devices, key)
  },
  UPDATE_NEW_DEVICE(state, information) {
    state.newDevice = Object.assign(state.newDevice, information)
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}