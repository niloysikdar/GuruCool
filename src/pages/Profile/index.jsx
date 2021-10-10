import { useState, useEffect } from 'react';

import { getCurrentUser } from '../../api';
import styles from './profile.module.scss';
import profileBanner from '../../assets/profile.svg';

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getCurrentUser().then((res) => setUserData(res.data.user));
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.text}>
        <h2>Your Profile</h2>
        <h3>Name: {userData.fullname}</h3>
        <h3>Email: {userData.email}</h3>
        <h3>Role: {userData.role}</h3>
        <h3>Roll No: {userData.rollNo}</h3>
        <h3>Points: {userData.points}</h3>
        <h3>Level: {userData.level}</h3>
        <h4>Joined Classes: {userData.classrooms?.length}</h4>
      </div>
      <div className={styles.banner}>
        <img src={profileBanner} alt='Profile' />
      </div>
    </div>
  );
};

export { Profile };
