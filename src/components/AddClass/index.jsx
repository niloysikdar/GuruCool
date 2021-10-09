import styles from './addclass.module.scss';

const AddClass = ({ closeHandler }) => {
  return (
    <div className={styles.modal}>
      <button onClick={closeHandler}>Close</button>
    </div>
  );
};

export { AddClass };
