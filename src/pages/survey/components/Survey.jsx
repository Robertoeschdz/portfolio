import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GoHome from '../../../components/GoHome'
import { getData, saveAnswers } from './firestore'

export default function Survey () {
  const { id } = useParams()
  const [data, setData] = useState()
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')
  const [answer3, setAnswer3] = useState('')
  const [answer4, setAnswer4] = useState('')
  const [alert, setAlert] = useState(false)

  const fetch = async () => {
    const data = await getData()
    const current = data.find(element => element.id === id)
    setData(current)
  }

  useEffect(() => {
    fetch()
  }, [])

  console.log(data)

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'answer1':
        setAnswer1(e.target.value)
        break
      case 'answer2':
        setAnswer2(e.target.value)
        break
      case 'answer3':
        setAnswer3(e.target.value)
        break
      case 'answer4':
        setAnswer4(e.target.value)
        break
      default:
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const clean1 = answer1.trim()
    const clean2 = answer2.trim()
    const clean3 = answer3.trim()
    const clean4 = answer4.trim()
    if (clean1 === '' || clean2 === '' || clean3 === '' || clean4 === '') {
      setAlert(true)
      setTimeout(() => setAlert(false), 1500)
    } else {
      const questionsId = id
      const answers = [answer1, answer2, answer3, answer4]
      saveAnswers(questionsId, answers)
      setAnswer1('')
      setAnswer2('')
      setAnswer3('')
      setAnswer4('')
    }
  }

  return (
    <div className='text-white h-screen bg-slate-900'>
      <GoHome />
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit} className='w-6/12'>
          {alert ? <h1 className='text-xl text-red-700 font-semibold'>Please complete the form</h1> : ''}
          <div className='flex flex-col mt-6'>
            <label htmlFor='answer1'>{data?.questions[0]}</label>
            <input type='text' onChange={handleChange} className='rounded text-black' id='answer1' value={answer1} />
          </div>
          <div className='flex flex-col mt-6'>
            <label htmlFor='answer2' className='form-label'>{data?.questions[1]}</label>
            <input type='text' onChange={handleChange} className='rounded text-black' id='answer2' value={answer2} />
          </div>
          <div className='flex flex-col mt-6'>
            <label htmlFor='answer3' className='form-label'>{data?.questions[2]}</label>
            <input type='text' onChange={handleChange} className='rounded text-black' id='answer3' value={answer3} />
          </div>
          <div className='flex flex-col mt-6'>
            <label htmlFor='answer4' className='form-label'>{data?.questions[3]}</label>
            <input type='text' onChange={handleChange} className='rounded text-black' id='answer4' value={answer4} />
          </div>
          <button type='submit' className='bg-green-500 mt-4 p-2.5 ease-in duration-200 hover:bg-green-700 rounded'>Submit</button>
        </form>
      </div>
    </div>
  )
}
