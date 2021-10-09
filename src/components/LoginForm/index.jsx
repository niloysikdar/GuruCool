import { InputField } from '../InputField';

const LoginForm = ({ loginData, onChange }) => {
  return (
    <div>
      <InputField
        type='email'
        id='email'
        value={loginData.email}
        placeholder='Email'
        onChange={onChange}
      />
      <InputField
        type='password'
        id='password'
        value={loginData.password}
        placeholder='Password'
        onChange={onChange}
      />
    </div>
  );
};

export { LoginForm };
