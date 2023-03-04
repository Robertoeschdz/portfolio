import { useState } from 'react'

import styles from './weatherForm.module.css'

export default function WeatherForm ({ onChangeCity, alert }) {
  const [city, setCity] = useState('')

  function onChange (e) {
    const value = e.target.value

    if (value !== '') {
      setCity(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onChangeCity(city)
  }

  return (
    <>
      {alert ? <h1 className={styles.alert}>Please select a valid city E.j: Lima, New York, Mexico City(no cdmx)</h1> : ''}
      <form onSubmit={handleSubmit} className={styles.container}>
        <input type='text' onChange={onChange} className={styles.input} placeholder='Where do you want to know the weather?' />
      </form>
    </>
  )
}
