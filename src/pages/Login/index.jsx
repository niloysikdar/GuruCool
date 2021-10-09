import { useState } from 'react';
import styles from './login.module.scss';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.imagewrapper}></div>
        <div className={styles.form}>
          <div className={styles.loginselector}>
            <button
              className={isLogin && styles.selected}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin && styles.selected}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
