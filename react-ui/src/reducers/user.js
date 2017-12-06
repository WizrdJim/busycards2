import { SET_LOCATION } from '../actions';
const INIT_STATE = {
    latitude: 0,
    longitude: 0
}

const UserReducer = (state = INIT_STATE, action) => {
  switch(action.type) {
  case SET_LOCATION:
    // console.log("Payload in reducer: " + Object.assign(state.coords, {
    //   latitude: action.payload.latitude,
    //   longitude: action.payload.longitude
    // }))
    return Object.assign(state,  {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      });
  default:
    return state

  }
}

export default UserReducer;