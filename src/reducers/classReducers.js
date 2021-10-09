import { actionTypes } from '../constants/actionTypes';

const classReducer = (allClasses = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_CLASS:
      return [...allClasses, action.payload];

    default:
      return allClasses;
  }
};

export default classReducer;
