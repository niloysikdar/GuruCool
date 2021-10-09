import styles from './leaderboard.module.scss';

const Labels = ['Name', 'Roll No.', 'Level', 'Points'];

const LeaderBoard = ({ leaderboardData }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {Labels.map((label) => (
            <th key={label}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {leaderboardData.map((data) => {
          return (
            <tr key={data._id}>
              <td>{data.fullname}</td>
              <td>{data.rollNo}</td>
              <td>{data.level}</td>
              <td>{data.points}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { LeaderBoard };
