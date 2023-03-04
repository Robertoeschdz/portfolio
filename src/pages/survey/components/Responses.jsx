import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GoHome from '../../../components/GoHome'
import { getData } from './firestore'

export default function Responses () {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [questions, setQuestions] = useState([])

  const fetch = async () => {
    const data = await getData()
    const elements = []
    data.forEach((element) => {
      if (element.questions_id === id) {
        elements.push(element)
      }
    })
    const found = data.find(element => element.id === id)
    setData(elements)
    setQuestions(found)
  }

  const idGenerator = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomNumber = 0

    for (let i = 0; i < 6; i++) {
      randomNumber += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomNumber
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className='text-white bg-gray-900'>
      <GoHome />
      <h1 className='text-6xl p-5'>Responses:</h1>
      <div className='w-1/2 ml-40'>
        {data.map(element => (
          <div key={idGenerator()} className='mt-36'>
            <div className='mt-5'>
              {element.answers.map((answer, index) => (
                <div className='rounded bg-slate-600 p-6 mt-5' key={idGenerator()}>
                  <h2 className='text-xl'>{questions.questions[index]}</h2>
                  <p>{answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ height: '610px' }} />
      </div>
    </div>
  )
}
