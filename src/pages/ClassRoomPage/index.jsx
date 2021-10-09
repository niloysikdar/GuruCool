import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getClassData, getLeaderboard } from '../../api';
import { LeaderBoard } from '../../components/LeaderBoard';
import styles from './classroompage.module.scss';

const ClassRoom = () => {
  const classId = useLocation().pathname.split('/').at(-1);
  const currentUserId = JSON.parse(localStorage.getItem('userdata')).userId;
  const currentFullName = JSON.parse(localStorage.getItem('userdata')).user
    .fullname;
  const [classData, setClassData] = useState({});
  const [leaderboardData, setleaderBoardData] = useState([]);

  useEffect(() => {
    getClassData(classId).then((data) => setClassData(data.data.data));
    getLeaderboard(classId).then((data) =>
      setleaderBoardData(data.data.data.leaderboard)
    );
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
      <div className={styles.leaderboard}>
        <h3>Leaderboard:</h3>
        <LeaderBoard leaderboardData={leaderboardData} />
      </div>
    </div>
  );
};

export { ClassRoom };
