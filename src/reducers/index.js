import { combineReducers } from 'redux';

import authReducer from './auth';
import classReducer from './classReducers';

export default combineReducers({ authReducer, classReducer });
