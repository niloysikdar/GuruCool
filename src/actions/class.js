import * as api from '../api';
import { actionTypes } from '../constants/actionTypes';

export const getAllClasses = () => async (dispatch) => {
  try {
    const { data } = await api.getALlClass();
    console.log(data.data.classrooms);
    dispatch({
      type: actionTypes.GET_ALL_CLASSES,
      payload: data.data.classrooms,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createClass = (classData) => async (dispatch) => {
  try {
    const { data } = await api.createClass(classData);
    console.log(data.data);
    dispatch({ type: actionTypes.CREATE_CLASS, payload: data.data });
  } catch (error) {
    console.log(error.message);
  }
};
