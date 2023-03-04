import { useEffect, useState } from 'react'
import styles from '../quizzes.module.css'

export default function Questionnaire ({ hours, minutes, seconds, activeButton, setActiveButton, setCorrect, correct, setQuestionIndex, questionIndex, time, setTime, questions }) {
  const [alert, setAlert] = useState(false)

  const handleNext = (e) => {
    if (activeButton) {
      setQuestionIndex(questionIndex + 1)
      setActiveButton(false)
      const text = activeButton.textContent
      const answer = questions[questionIndex].answer
      if (text === answer) {
        setCorrect(correct + 1)
      }
    } else {
      setAlert(true)
      setTimeout(function () {
        setAlert(false)
      }, 1000)
    }
  }
  const handleSelect = (e) => {
    const botonClickeado = e.target
    if (activeButton) {
      activeButton.classList.remove(styles.selected)
    }
    botonClickeado.classList.add(styles.selected)
    setActiveButton(botonClickeado)
  }
  const chronometer = () => {
    questionIndex === questions.length ? console.log('end') : setTime(time + 1)
  }

  useEffect(() => {
    const intervalId = setInterval(chronometer, 1000)
    return () => clearInterval(intervalId)
  })

  return (
    <div className='p-8'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-center text-5xl mb-5'>Javascript quiz</h1>
        <span className='text-center text-xl'>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
      </div>
      <h2 className='text-center text-3xl my-3'>
        {questions[questionIndex]
          ? questions[questionIndex].question
          : 'Charging.....'}
      </h2>
      {alert
        ? <h2 className='text-red-700 text-2xl'>Please select an option</h2>
        : ''}
      <div className='flex flex-col items-center justify-center mt-4'>
        {questions[questionIndex]?.choises.map(q => (
          <div key={q}>
            <div>
              <div className='mb-4'>
                <button className={styles.option} onClick={handleSelect}>
                  {q || 'Charging.....'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col items-center h-screen'>
        <button className='bg-green-700 py-2.5 px-8 rounded mt-2 hover:bg-green-800' onClick={handleNext}>Next</button>
        <p className='text-xl mt-4'>{questionIndex + 1}/{questions.length}</p>
      </div>
    </div>
  )
}
