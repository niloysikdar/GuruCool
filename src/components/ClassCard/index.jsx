import styles from './classcard.module.scss';

const ClassCard = ({ classData }) => {
  const NAME = JSON.parse(localStorage.getItem('userdata')).user.fullname;
  const ROLE = JSON.parse(localStorage.getItem('userdata')).user.role;
  return (
    <div className={styles.card}>
      <h2>{classData.name}</h2>
      <p>{classData.description}</p>
      <h3>Created By: {ROLE === 'Teacher' ? NAME : classData.fullname}</h3>
      <h3>Created On: {classData.createdAt.split('T')[0]}</h3>
      <button>View Class</button>
    </div>
  );
};

export { ClassCard };
