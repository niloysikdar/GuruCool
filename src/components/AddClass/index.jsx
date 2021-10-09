import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { createClass } from '../../actions/class';

import { InputField } from '../InputField';
import styles from './addclass.module.scss';

const AddClass = ({ closeHandler }) => {
  const dispatch = useDispatch();

  const [newClassData, setNewClassData] = useState({
    name: '',
    description: '',
  });

  const handleOnchange = (e) => {
    setNewClassData({ ...newClassData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newClassData);
    dispatch(createClass(newClassData));
    closeHandler();
  };

  return (
    <div className={styles.modal}>
      <form>
        <div className={styles.header}>
          <h3>Create New Class</h3>
          <AiOutlineCloseCircle
            size={35}
            style={{ cursor: 'pointer' }}
            onClick={closeHandler}
          />
        </div>
        <InputField
          type='text'
          id='name'
          value={newClassData.name}
          placeholder='New Class Name'
          onChange={handleOnchange}
        />
        <InputField
          type='text'
          id='description'
          value={newClassData.description}
          placeholder='Class Description'
          onChange={handleOnchange}
        />
        <button onClick={handleSubmit}>Create New Class</button>
      </form>
    </div>
  );
};

export { AddClass };
