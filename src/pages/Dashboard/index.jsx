import { useModal } from '../../hooks/useModal';
import { ClassCard } from '../../components/ClassCard';
import { AddClass } from '../../components/AddClass';
import styles from './dashboard.module.scss';

const Dashboard = () => {
  const NAME = JSON.parse(localStorage.getItem('userdata')).user.fullname;
  const { isModalOpen, open, close } = useModal();

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {isModalOpen && <AddClass closeHandler={close} />}
      <div className={styles.dashboard}>
        <div className={styles.introdiv}>
          <div className={styles.text}>
            <h1>Welcome, {NAME}</h1>
            <h2>Your Classes:</h2>
          </div>
          <button onClick={open}>Create New Class</button>
        </div>
        <div className={styles.cards}>
          {nums.map((item) => (
            <ClassCard key={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export { Dashboard };
