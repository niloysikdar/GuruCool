import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getClassData } from '../../api';
import styles from './classroompage.module.scss';

const ClassRoom = () => {
  const classId = useLocation().pathname.split('/').at(-1);
  const currentUserId = JSON.parse(localStorage.getItem('userdata')).userId;
  const currentFullName = JSON.parse(localStorage.getItem('userdata')).user
    .fullname;
  const [classData, setClassData] = useState({});

  useEffect(() => {
    getClassData(classId).then((data) => setClassData(data.data.data));
  }, [classId]);

  return (
    <div className={styles.classroompage}>
      <h2>{classData.name}</h2>
      <p>{classData.description}</p>
      <h3>Created By: {classData.fullname}</h3>
      <h3>Created On: {classData.createdAt?.split('T')[0]}</h3>
      {!classData.students?.includes(currentUserId) ||
      classData.fullname === currentFullName ? (
        <button>Already Joined</button>
      ) : (
        <button>Join Now</button>
      )}

      <br />
      <br />
      {JSON.stringify(classData)}
    </div>
  );
};

export { ClassRoom };
