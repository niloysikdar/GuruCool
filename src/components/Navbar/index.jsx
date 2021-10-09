import styles from './navbar.module.scss';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <button>Profile</button>
      <button>Sign Out</button>
    </div>
  );
};

export { Navbar };
