import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import '../memoryGame.css'
import { useNavigate } from 'react-router-dom'
import { saveData } from './firestore'
import FinalsButtons from './FinalsButtons'

export default function Game ({ username }) {
  const [randomArray, setRandomArray] = useState([])
  const [activeCardId, setActiveCardId] = useState('')
  const [activeCard, setActiveCard] = useState(false)
  const [twoActive, setTwoActive] = useState(false)
  const [corrects, setCorrects] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [errors, setErrors] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const navigate = useNavigate()
  const cards = [
    { id: 1, url: '/memoryImg/apache.avif', flipped: false },
    { id: 2, url: '/memoryImg/c++.png', flipped: false },
    { id: 3, url: '/memoryImg/css.png', flipped: false },
    { id: 4, url: '/memoryImg/github.avif', flipped: false },
    { id: 5, url: '/memoryImg/go.png', flipped: false },
    { id: 6, url: '/memoryImg/java.png', flipped: false },
    { id: 7, url: '/memoryImg/js.png', flipped: false },
    { id: 8, url: '/memoryImg/linux.avif', flipped: false },
    { id: 9, url: '/memoryImg/php.png', flipped: false },
    { id: 10, url: '/memoryImg/python.png', flipped: false },
    { id: 11, url: '/memoryImg/apache.avif', flipped: false },
    { id: 12, url: '/memoryImg/c++.png', flipped: false },
    { id: 13, url: '/memoryImg/css.png', flipped: false },
    { id: 14, url: '/memoryImg/github.avif', flipped: false },
    { id: 15, url: '/memoryImg/go.png', flipped: false },
    { id: 16, url: '/memoryImg/java.png', flipped: false },
    { id: 17, url: '/memoryImg/js.png', flipped: false },
    { id: 18, url: '/memoryImg/linux.avif', flipped: false },
    { id: 19, url: '/memoryImg/php.png', flipped: false },
    { id: 20, url: '/memoryImg/python.png', flipped: false }
  ]

  useEffect(() => {
    const shuffledArray = cards.sort(() => Math.random() - 0.5)
    setRandomArray(shuffledArray)
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      if (corrects === cards.length / 2) {
        console.log('end')
      } else {
        if (seconds < 59) {
          setSeconds(seconds + 1)
        } else {
          if (minutes < 59) {
            setMinutes(minutes + 1)
            setSeconds(0)
          } else {
            handleAgain()
          }
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds, seconds])

  const handleFlip = (e, id) => {
    if (e.target.classList.contains('card-face-front')) {
      if (!twoActive) {
        let updatedItems = []
        if (activeCard) {
          updatedItems = randomArray.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                flipped: true
              }
            }
            return item
          })
          setRandomArray(updatedItems)
          setTwoActive(true)
          if (activeCardId + 10 === id || activeCardId - 10 === id) {
            setCorrects(corrects + 1)
            setTwoActive(false)
            setActiveCard(false)
            setActiveCardId('')
            if (corrects + 1 === randomArray.length / 2) {
              setCompleted(true)
            }
          } else {
            setTimeout(function (id) {
              updatedItems = randomArray.map((item) => {
                if (item.id === id || item.id === activeCardId) {
                  return {
                    ...item,
                    flipped: false
                  }
                }
                return item
              })
              setRandomArray(updatedItems)
              setTwoActive(false)
              setActiveCard(false)
              setActiveCardId('')
              setErrors(errors + 1)
            }, 800)
          }
        } else {
          updatedItems = randomArray.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                flipped: true
              }
            }
            return item
          })
          setActiveCard(true)
          setActiveCardId(id)
          setRandomArray(updatedItems)
        }
      }
    }
  }

  const handleResults = () => {
    saveData(errors, minutes, seconds, username)
    navigate('/memorygame/results')
  }

  const handleAgain = () => {
    setRandomArray([])
    setActiveCardId('')
    setActiveCard(false)
    setTwoActive(false)
    setCorrects(0)
    setCompleted(false)
    setErrors(0)
    setMinutes(0)
    setSeconds(0)
    const shuffledArray = cards.sort(() => Math.random() - 0.5)
    setRandomArray(shuffledArray)
  }

  return (
    <div className='p-10 flex flex-col items-center'>
      <div className='grid grid-cols-2 min-[430px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-3'>
        {randomArray.map(item => (
          <div key={uuidv4()} onClick={(e) => handleFlip(e, item.id)} className={`memoryContent ${item.flipped ? 'is-flipped' : ''}`} id={item?.id}>
            <div className='card-face card-face-front' />
            <img className={`memoryImage card-face card-face-back ${item.flipped ? 'display-card-face-back' : ''}`} src={item?.url} alt='img' />
          </div>
        ))}
      </div>
      <span className='text-red-900 text-4xl font-semibold'>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
      {completed
        ? <FinalsButtons handleAgain={handleAgain} handleResults={handleResults} />
        : ''}
    </div>
  )
}
