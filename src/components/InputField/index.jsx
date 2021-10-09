import styles from './inputfield.module.scss';

const InputField = ({ type, id, value, placeholder, onChange }) => {
  return (
    <input
      className={styles.input}
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete='off'
      required
    />
  );
};

export { InputField };
