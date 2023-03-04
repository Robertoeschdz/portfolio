import { useEffect, useState } from 'react'
import { getData } from './components/firestore'
import Game from './components/Game'
import GoHome from '../../components/GoHome'

export default function MemoryGame () {
  const [username, setUsername] = useState('')
  const [play, setPlay] = useState('')
  const [data, setData] = useState([])
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)

  const fetch = async () => {
    const data = await getData()
    setData(data)
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = username.trim()
    if (value === '' || username === null || username === undefined) {
      setAlert2(true)
      setUsername('')
      setTimeout(() => {
        setAlert2(false)
      }, 1000)
    } else {
      setPlay(true)
    }
  }

  const handleChange = (e) => {
    const text = e.target.value
    const found = data.find((item) => item.username === text)

    if (found) {
      setAlert(true)
      setUsername('')
      setTimeout(() => {
        setAlert(false)
      }, 1500)
    } else {
      setUsername(e.target.value)
    }
  }

  return (
    <div>
      <GoHome />
      {
        play
          ? <Game username={username} />
          : <form onSubmit={handleSubmit} className='flex flex-col items-center'>
            {alert2
              ? <label htmlFor='inputUsername' className='form-label text-danger h4'>Please select a username</label>
              : ''}
            <div className='mt-10 flex flex-col w-1/2 sm:w-1/4'>
              {alert
                ? <label htmlFor='inputUsername' className='form-label text-red-500 text-2xl'>Username busy, please select another</label>
                : <label htmlFor='inputUsername' className='text-white form-label'>Please select a username for play</label>}
              <input onChange={handleChange} value={username} type='text' className='rounded' id='inputUsername' placeholder='Username' />
            </div>
            <button type='submit' className='text-white bg-green-600 py-2.5 px-10 mt-5 rounded'>Submit</button>
            </form>
      }
    </div>
  )
}
