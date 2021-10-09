import styles from './classcard.module.scss';

const ClassCard = ({ classData }) => {
  return (
    <div className={styles.card}>
      <h2>{classData.name}</h2>
      <p>{classData.description}</p>
      <h3>Created By: {classData.fullname}</h3>
      <h3>Created On: {classData.createdAt.split('T')[0]}</h3>
      <button>View Class</button>
    </div>
  );
};

export { ClassCard };
