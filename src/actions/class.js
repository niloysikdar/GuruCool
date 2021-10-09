import * as api from '../api';
import { actionTypes } from '../constants/actionTypes';

export const createClass = (classData) => async (dispatch) => {
  try {
    const { data } = await api.createClass(classData);
    console.log(data.data);
    dispatch({ type: actionTypes.CREATE_CLASS, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};
