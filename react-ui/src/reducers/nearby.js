import { NEARBY_USERS } from '../actions';

const NearbyReducer = (near = {nearbyList: []}, action) => {
  switch(action.type){
    case NEARBY_USERS:
      return Object.assign(near, {
        nearbyList: action.payload.users
      })
    default:
      return near
  }
}

export default NearbyReducer;