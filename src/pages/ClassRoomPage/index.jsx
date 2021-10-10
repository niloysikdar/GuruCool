import { useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';

import { getClassData, getLeaderboard, joinClass } from '../../api';
import { LeaderBoard } from '../../components/LeaderBoard';
import styles from './classroompage.module.scss';

const ClassRoom = () => {
  const history = useHistory();
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

  const handleJoinClass = (e) => {
    e.preventDefault();
    joinClass(classId).then(() => history.replace('/'));
  };

  const checkIncludes = (fullData, key) => {
    var result = false;
    fullData?.forEach((element) => {
      if (element.userId === key) {
        result = true;
      }
    });
    return result;
  };

  return (
    <div className={styles.classroompage}>
      <h2>{classData.name}</h2>
      <p>{classData.description}</p>
      <h3>Created By: {classData.fullname}</h3>
      <h3>Created On: {classData.createdAt?.split('T')[0]}</h3>
      <div>
        {checkIncludes(classData.students, currentUserId) ||
        classData.fullname === currentFullName ? (
          <button>Already Joined</button>
        ) : (
          <button onClick={handleJoinClass}>Join Now</button>
        )}
        <Link
          to='/quiz'
          className={styles.button}
          style={{ textDecoration: 'none' }}
        >
          Take Quiz
        </Link>
        <Link
          to='/meet'
          className={styles.button}
          style={{ textDecoration: 'none' }}
        >
          Join Meeting
        </Link>
        <a
          href={`https://wbo.ophir.dev/boards/${classId}`}
          target='_blank'
          rel='noreferrer'
          className={styles.button}
          style={{ textDecoration: 'none' }}
        >
          Join Whiteboard
        </a>
      </div>
      <div className={styles.leaderboard}>
        <h3>Leaderboard:</h3>
        <LeaderBoard leaderboardData={leaderboardData} />
      </div>
    </div>
  );
};

export { ClassRoom };
