import { useEffect, useState } from 'react'
import WeatherForm from './WeatherForm'
import WeatherMainInfo from './WeatherMainInfo'
import Loading from './Loading'

import styles from './WeatherApp.module.css'

export default function WeatherApp () {
  const [weather, setWeather] = useState([])
  const [load, setLoad] = useState(false)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    loadInfo()
  }, [])

  useEffect(() => {
    document.title = `Weather | ${load ? weather.location.name : ''}`
  }, [weather, load])

  const loadInfo = async (city = 'london') => {
    try {
      setLoad(false)
      const request = await fetch(`${import.meta.env.VITE_WEATHER_URL}&key=${import.meta.env.VITE_WEATHER_KEY}&q=${city}`)
      const json = await request.json()
      setWeather(json)
      setLoad(true)
      setAlert(false)
      if (json.error) {
        setAlert(true)
        setLoad(false)
        const request = await fetch(`${import.meta.env.VITE_WEATHER_URL}&key=${import.meta.env.VITE_WEATHER_KEY}&q=london`)
        const json = await request.json()
        setWeather(json)
        setLoad(true)
        setTimeout(() => {
          setAlert(false)
        }, 2000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleChangeCity = (city) => {
    setWeather(null)
    loadInfo(city)
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity} alert={alert} />

      {
        load
          ? <WeatherMainInfo weather={weather} />
          : <Loading />
      }
    </div>
  )
}
