import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login, signUp } from '../../actions/auth';

import { LoginForm } from '../../components/LoginForm';
import { SignUpForm } from '../../components/SignUpForm';
import styles from './auth.module.scss';
import image from '../../assets/intro.svg';

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    fullname: '',
    email: '',
    password: '',
    role: 'Student',
    rollNo: '',
  });

  useEffect(() => {
    const userdata = localStorage.getItem('userdata');
    if (userdata) {
      history.replace('/');
    }
  }, [history]);

  const onLoginChangeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const onSignUpChangeData = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    isLogin
      ? dispatch(login(loginData, history))
      : dispatch(signUp(signUpData, history));
  };

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.imagewrapper}>
          <h2>GuruCool</h2>
          <img src={image} alt='Banner' />
        </div>
        <div className={styles.form}>
          <div className={styles.loginselector}>
            <button
              className={isLogin ? styles.selected : null}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? styles.selected : null}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          <form onSubmit={onSubmitHandler} autoComplete='off'>
            {isLogin ? (
              <LoginForm
                loginData={loginData}
                onChange={onLoginChangeHandler}
              />
            ) : (
              <SignUpForm
                signUpData={signUpData}
                onChange={onSignUpChangeData}
              />
            )}
            <button type='submit'>{isLogin ? 'Login' : 'Sign Up'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Auth };
