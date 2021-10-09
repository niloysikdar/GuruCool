import { useSelector } from 'react-redux';

import { useModal } from '../../hooks/useModal';
import { ClassCard } from '../../components/ClassCard';
import { AddClass } from '../../components/AddClass';
import styles from './dashboard.module.scss';

const Dashboard = () => {
  const NAME = JSON.parse(localStorage.getItem('userdata')).user.fullname;
  const ROLE = JSON.parse(localStorage.getItem('userdata')).user.role;
  const { isModalOpen, open, close } = useModal();

  const allClasses = useSelector((state) => state.classReducer);

  return (
    <>
      {isModalOpen && <AddClass closeHandler={close} />}
      <div className={styles.dashboard}>
        <div className={styles.introdiv}>
          <div className={styles.text}>
            <h1>Welcome, {NAME}</h1>
            <h2>Your Classes:</h2>
          </div>
          {ROLE === 'Teacher' && (
            <button onClick={open}>Create New Class</button>
          )}
        </div>
        <div className={styles.cards}>
          {allClasses.map((classData) => (
            <ClassCard key={classData._id} classData={classData} />
          ))}
        </div>
      </div>
    </>
  );
};

export { Dashboard };
