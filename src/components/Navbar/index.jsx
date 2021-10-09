import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { actionTypes } from '../../constants/actionTypes';
import styles from './navbar.module.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [userdata, setUserdata] = useState(
    JSON.parse(localStorage.getItem('userdata'))
  );

  const logout = () => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
    history.replace('/auth');
    setUserdata(null);
  };

  useEffect(() => {
    setUserdata(JSON.parse(localStorage.getItem('userdata')));
    if (userdata) {
      const decodedToken = decode(userdata.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <div className={styles.navbar}>
      <button>Profile</button>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};

export { Navbar };
