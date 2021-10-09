import { InputField } from '../InputField';
import styles from './signup.module.scss';

const SignUpForm = ({ signUpData, onChange }) => {
  return (
    <div>
      <InputField
        type='text'
        id='fullname'
        value={signUpData.fullname}
        placeholder='Full Name'
        onChange={onChange}
      />
      <InputField
        type='email'
        id='email'
        value={signUpData.email}
        placeholder='Email'
        onChange={onChange}
      />
      <InputField
        type='password'
        id='password'
        value={signUpData.password}
        placeholder='Password'
        onChange={onChange}
      />
      <div style={{ margin: '8px 0' }}>
        <label className={styles.select} htmlFor='role'>
          Choose a Role:
        </label>
        <select
          className={styles.role}
          name='role'
          id='role'
          value={signUpData.role}
          onChange={onChange}
        >
          <option value='Student'>Student</option>
          <option value='Teacher'>Teacher</option>
        </select>
      </div>
      {signUpData.role === 'Student' && (
        <InputField
          type='text'
          id='rollNo'
          value={signUpData.rollNo}
          placeholder='Roll No'
          onChange={onChange}
        />
      )}
    </div>
  );
};

export { SignUpForm };
