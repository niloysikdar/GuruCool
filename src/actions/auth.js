import * as api from '../api';
import { actionTypes } from '../constants/actionTypes';

export const login = (formData, history) => async (dispatch) => {
  try {
    // Login the user
    const { data } = await api.login(formData);
    dispatch({ type: actionTypes.AUTH, payload: data });
    history.replace('/');
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    // SignUp the User
    const { data } = await api.signup(formData);
    dispatch({ type: actionTypes.AUTH, payload: data });
    history.replace('/');
  } catch (error) {
    console.log(error);
  }
};
