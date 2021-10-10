import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getQuizQuestions, submitQuiz } from '../../api';
import styles from './quiz.module.scss';
import swal from 'sweetalert';

const Quiz = () => {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);
  const [answer3, setAnswer3] = useState(0);

  const answers = [answer1, answer2, answer3];

  useEffect(() => {
    getQuizQuestions().then((res) =>
      setQuestions(res.data.data.quizzes[0].qnas)
    );
  }, []);

  const setAnswerValue = (index, value) => {
    if (index === 0) {
      setAnswer1(value);
    }
    if (index === 1) {
      setAnswer2(value);
    }
    if (index === 2) {
      setAnswer3(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const answerData = { answers: answers };
    submitQuiz(answerData).then((res) => {
      console.log(res.data);
      swal('Quiz has been submitted successfully', {
        icon: 'success',
      });
      history.replace('/profile');
    });
  };

  return (
    <div className={styles.quiz}>
      <h2>Play the Quiz and earn points to Level Up:</h2>
      <div className={styles.questions}>
        {questions.map((question, index1) => {
          return (
            <div className={styles.card} key={question.question}>
              <h3>{question.question}</h3>
              <div className={styles.options}>
                {question.options.map((option, index) => (
                  <div
                    className={
                      answers[index1] !== index
                        ? styles.button
                        : styles.buttonactive
                    }
                    key={index}
                    onClick={() => setAnswerValue(index1, index)}
                  >
                    {option.option}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <h3>
        Selected Answers: {answer1}, {answer2}, {answer3}
      </h3>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export { Quiz };
