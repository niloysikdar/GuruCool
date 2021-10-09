import { ClassCard } from '../../components/ClassCard';
import styles from './dashboard.module.scss';

const Dashboard = () => {
  const NAME = JSON.parse(localStorage.getItem('userdata')).user.fullname;

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className={styles.dashboard}>
      <h1>Welcome, {NAME}</h1>
      <h2>Your Classes:</h2>
      <div className={styles.cards}>
        {nums.map((item) => (
          <ClassCard key={item} />
        ))}
      </div>
    </div>
  );
};

export { Dashboard };
