import { combineReducers } from 'redux';
import AuthReducer from './auth';
import CardReducer from './card';
import UserReducer from './user';
import NearbyReducer from './nearby';

const rootReducer = combineReducers({
  auth: AuthReducer,
  card: CardReducer,
  user: UserReducer,
  nearby: NearbyReducer
});

export default rootReducer;