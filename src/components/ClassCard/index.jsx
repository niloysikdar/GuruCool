import styles from './classcard.module.scss';

const ClassCard = () => {
  return (
    <div className={styles.card}>
      <h2>CSE SEM 5</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus, veniam
        qui. Facilis laudantium ipsam commodi labore. Esse maxime debitis nam
        dolorum fuga, sunt qui, nemo vero aut doloremque commodi! A.
      </p>
      <h3>Created By: Dipak Kumar Kole</h3>
      <button>View Class</button>
    </div>
  );
};

export { ClassCard };
