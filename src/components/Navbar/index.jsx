import { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
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
      <Link to='/' className={styles.button} style={{ textDecoration: 'none' }}>
        Home
      </Link>
      <div>
        <Link
          to='/profile'
          className={styles.button}
          style={{ textDecoration: 'none' }}
        >
          Profile
        </Link>
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
};

export { Navbar };
