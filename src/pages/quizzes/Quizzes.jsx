import { useEffect, useState } from 'react'
import End from './components/End'
import { getData } from './components/firestore'
import Questionnaire from './components/Questionnaire'
import GoHome from '../../components/GoHome'

export default function Quiz () {
  const [questions, setQuestions] = useState([])
  const [correct, setCorrect] = useState(0)
  const [activeButton, setActiveButton] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [time, setTime] = useState(0)

  const getQuestions = async () => {
    const questions = await getData()
    setQuestions(questions)
  }

  useEffect(() => {
    getQuestions()
  }, [])

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  return (
    <div className='bg-black text-white'>
      <GoHome />
      {questionIndex === questions.length
        ? <End hours={hours} minutes={minutes} seconds={seconds} correct={correct} questions={questions} setActiveButton={setActiveButton} setCorrect={setCorrect} setQuestionIndex={setQuestionIndex} setTime={setTime} />
        : <Questionnaire hours={hours} minutes={minutes} seconds={seconds} correct={correct} questions={questions} activeButton={activeButton} setActiveButton={setActiveButton} setCorrect={setCorrect} setQuestionIndex={setQuestionIndex} questionIndex={questionIndex} time={time} setTime={setTime} />}
    </div>
  )
}
