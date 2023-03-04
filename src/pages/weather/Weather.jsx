import './Weather.css'
import WeatherApp from './components/WeatherApp'
import GoHome from '../../components/GoHome'

function Weather () {
  return (
    <div className='App'>
      <GoHome />
      <WeatherApp />
    </div>
  )
}

export default Weather
