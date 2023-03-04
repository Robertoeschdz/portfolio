import { useState } from 'react'
import './surveysApp.css'
import { saveQuestions } from './components/firestore'
import GoHome from '../../components/GoHome'

export default function SurveysApp () {
  const [question1, setQuestion1] = useState('')
  const [question2, setQuestion2] = useState('')
  const [question3, setQuestion3] = useState('')
  const [question4, setQuestion4] = useState('')
  const [alert, setAlert] = useState(false)
  const [url, setUrl] = useState('')

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'question1':
        setQuestion1(e.target.value)
        break
      case 'question2':
        setQuestion2(e.target.value)
        break
      case 'question3':
        setQuestion3(e.target.value)
        break
      case 'question4':
        setQuestion4(e.target.value)
        break
      default:
    }
  }

  const idGenerator = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomNumber = 0

    for (let i = 0; i < 6; i++) {
      randomNumber += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomNumber
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const clean1 = question1.trim()
    const clean2 = question2.trim()
    const clean3 = question3.trim()
    const clean4 = question4.trim()
    if (clean1 === '' || clean2 === '' || clean3 === '' || clean4 === '') {
      setAlert(true)
      setTimeout(() => setAlert(false), 1500)
    } else {
      const id = idGenerator()
      const questions = [question1, question2, question3, question4]
      saveQuestions(id, questions)
      setQuestion1('')
      setQuestion2('')
      setQuestion3('')
      setQuestion4('')
      setUrl(id)
    }
  }

  return (
    <div className='text-white h-screen bg-slate-900'>
      <GoHome />
      <div className='flex justify-center'>
        {url
          ? <div className='mt-6'>
            <h2 className='text-3xl'>Share your form: <a href={`/survey/${url}`} className='text-sky-400'>http://127.0.0.1:5173/survey/{url}</a></h2>
            <h2 className='text-3xl'>View the responses: <a href={`/survey/${url}/responses`} className='text-sky-400'>http://127.0.0.1:5173/survey/{url}/responses</a></h2>
            </div>
          : <form className='w-1/2' onSubmit={handleSubmit}>
            {alert ? <h1 className='text-xl text-red-700 font-semibold'>Please complete the form</h1> : ''}
            <div className='flex flex-col mt-6'>
              <label htmlFor='question1'>Question one</label>
              <input type='text' onChange={handleChange} className='rounded text-black' id='question1' value={question1} />
            </div>
            <div className='flex flex-col mt-6'>
              <label htmlFor='question2'>Question two</label>
              <input type='text' onChange={handleChange} className='rounded text-black' id='question2' value={question2} />
            </div>
            <div className='flex flex-col mt-6'>
              <label htmlFor='question3'>Question three</label>
              <input type='text' onChange={handleChange} className='rounded text-black' id='question3' value={question3} />
            </div>
            <div className='flex flex-col mt-6'>
              <label htmlFor='question4'>Question four</label>
              <input type='text' onChange={handleChange} className='rounded text-black' id='question4' value={question4} />
            </div>
            <button type='submit' className='bg-green-500 mt-4 p-2.5 ease-in duration-200 hover:bg-green-700 rounded'>Submit</button>
            </form>}
      </div>
    </div>
  )
}
