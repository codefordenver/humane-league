import { combineReducers } from 'redux';
import Placeholder from './Placeholder';
import User from './User';


const rootReducer = combineReducers({
  Placeholder,
  User
});

export default rootReducer;