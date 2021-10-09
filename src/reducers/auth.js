import { actionTypes } from '../constants/actionTypes';

const authReducer = (authData = {}, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      localStorage.setItem('userdata', JSON.stringify({ ...action?.payload }));
      authData = action?.payload;
      return authData;

    case actionTypes.LOGOUT:
      localStorage.removeItem('userdata');
      authData = {};
      return authData;

    default:
      return authData;
  }
};

export default authReducer;
