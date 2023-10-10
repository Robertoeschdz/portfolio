import { useEffect, useState } from 'react'
import styles from './deliveryApp.module.css'
import DeliveryIcon from './components/DeliveryIcon'
import { getData, saveData, updateHours } from './components/firestore'
import timer from './components/timer'
import GoHome from '../../components/GoHome'

export default function DeliveryApp () {
  const [activeButton, setActiveButton] = useState(null)
  const [selectedHour, setSelectedHour] = useState('')
  const [alert, setAlert] = useState('')
  const [complete, setComplete] = useState(false)
  const [crowded, setCrowed] = useState(false)
  const [availableDealers, setAvailableDealers] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [data, setData] = useState([])
  const hours = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30']

  const handleSelect = (e) => {
    const buttonClicked = e.target
    const arrayOfData = data.map(hour => (hour.data()))
    timer(data)
    if (data.length !== 0) {
      const searchedHour = buttonClicked.textContent
      let index = -1
      let currentAvilableD = null
      for (let i = 0; i < arrayOfData.length; i++) {
        if (arrayOfData[i].hour === searchedHour) {
          index = i
          break
        }
      }
      setCurrentIndex(index)
      data[index]
        ? currentAvilableD = data[index].data().availableDealers
        : currentAvilableD = 8
      if (activeButton) {
        if (buttonClicked === activeButton) {
          currentAvilableD !== 0
            ? buttonClicked.classList.remove(styles.selectedsuccess)
            : buttonClicked.classList.remove(styles.selecteddanger)
          setActiveButton(null)
          setSelectedHour('')
          setAvailableDealers(null)
        } else {
          if (currentAvilableD !== 0) {
            availableDealers !== 0
              ? activeButton.classList.remove(styles.selectedsuccess)
              : activeButton.classList.remove(styles.selecteddanger)
            buttonClicked.classList.add(styles.selectedsuccess)
            setActiveButton(buttonClicked)
            setSelectedHour(buttonClicked.textContent)
            data[index] ? setAvailableDealers(data[index].data().availableDealers) : setAvailableDealers(8)
          } else {
            availableDealers !== 0
              ? activeButton.classList.remove(styles.selectedsuccess)
              : activeButton.classList.remove(styles.selecteddanger)
            buttonClicked.classList.add(styles.selecteddanger)
            setActiveButton(buttonClicked)
            setSelectedHour(buttonClicked.textContent)
            setAvailableDealers(0)
          }
        }
      } else {
        if (currentAvilableD !== 0) {
          buttonClicked.classList.add(styles.selectedsuccess)
          setActiveButton(buttonClicked)
          setSelectedHour(buttonClicked.textContent)
          data[index] ? setAvailableDealers(data[index].data().availableDealers) : setAvailableDealers(8)
        } else {
          buttonClicked.classList.add(styles.selecteddanger)
          setActiveButton(buttonClicked)
          setSelectedHour(buttonClicked.textContent)
          setAvailableDealers(0)
        }
      }
    } else {
      if (activeButton) {
        if (buttonClicked === activeButton) {
          buttonClicked.classList.remove(styles.selectedsuccess)
          setActiveButton(null)
          setSelectedHour('')
          setAvailableDealers(null)
        } else {
          activeButton.classList.remove(styles.selectedsuccess)
          buttonClicked.classList.add(styles.selectedsuccess)
          setActiveButton(buttonClicked)
          setSelectedHour(buttonClicked.textContent)
          setAvailableDealers(8)
        }
      } else {
        buttonClicked.classList.add(styles.selectedsuccess)
        setActiveButton(buttonClicked)
        setSelectedHour(buttonClicked.textContent)
        setAvailableDealers(8)
      }
    }
  }

  const handleSubmit = () => {
    const today = new Date()
    const day = today.getDate()
    if (activeButton) {
      if (data[currentIndex]) {
        if (availableDealers !== 0) {
          const id = data[currentIndex].id
          const newDealers = availableDealers - 1
          updateHours(id, { availableDealers: newDealers })
          activeButton.classList.remove(styles.selectedsuccess)
          getHours()
          setAvailableDealers(null)
          setActiveButton(null)
          setSelectedHour('')
          setCurrentIndex(null)
          setComplete(true)
          setTimeout(function () {
            setComplete(false)
          }, 2000)
        } else {
          setCrowed(true)
          setTimeout(function () {
            setCrowed(false)
          }, 2000)
        }
      } else {
        saveData(selectedHour, availableDealers - 1, day)
        activeButton.classList.remove(styles.selectedsuccess)
        getHours()
        setAvailableDealers(null)
        setActiveButton(null)
        setSelectedHour('')
        setCurrentIndex(null)
        setComplete(true)
        setTimeout(function () {
          setComplete(false)
        }, 2000)
      }
    } else {
      setAlert(true)
      setTimeout(function () {
        setAlert(false)
      }, 1000)
    }
  }

  const getHours = async () => {
    const hours = await getData()
    setData(hours)
  }

  useEffect(() => {
    getHours()
  }, [])

  return (
    <div className='bg-gray-900 text-white'>
      <GoHome />
      <div className='p-5'>
        <p>Select your delivery time</p>
        {complete ? <h2 className='text-green-600 text-xl'>Hour added </h2> : ''}
        {alert ? <h2 className='text-red-600 text-xl'>Please select one hour</h2> : ''}
        {crowded ? <h2 className='text-red-600 text-xl'>All couriers are busy, please select another hour</h2> : ''}
        {availableDealers !== null
          ? availableDealers !== 0 ? <DeliveryIcon availableDealers={availableDealers} /> : <p className='text-red-600 text-xl'>No dealers available at this hour</p>
          : ''}
        <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-4'>
          {hours.map(hour => (
            <div key={hour} className='my-3'>
              <button className={styles.hour} onClick={handleSelect}>{hour}</button>
            </div>
          ))}
        </div>
        {complete ? <h2 className='text-green-600 text-xl'>Hour added </h2> : ''}
        {alert ? <h2 className='text-red-600 text-xl'>Please select one hour</h2> : ''}
        {crowded ? <h2 className='text-red-600 text-xl'>All couriers are busy, please select another hour</h2> : ''}
        {availableDealers !== null
          ? availableDealers !== 0 ? <DeliveryIcon availableDealers={availableDealers} /> : <p className='text-red-600 text-xl'>No dealers available at this hour</p>
          : ''}
        <p>Select your delivery time</p>
        <button className='bg-green-400 mt-5 py-2.5 px-8 rounded text-black hover:bg-green-500' onClick={handleSubmit}>Select</button>
      </div>
    </div>
  )
}
