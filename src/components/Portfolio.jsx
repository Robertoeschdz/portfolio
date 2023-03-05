import React from 'react'
import { Link } from 'react-router-dom'
import memory from '../assets/portfolio/memory.png'
import delivery from '../assets/portfolio/delivery.png'
import survey from '../assets/portfolio/survey.png'
import weather from '../assets/portfolio/weather.png'
import dino from '../assets/portfolio/dino.png'
import cripto from '../assets/portfolio/cripto.png'
import quizzes from '../assets/portfolio/quizzes.png'
import music from '../assets/portfolio/music.png'
import chat from '../assets/portfolio/chat.png'

const Portfolio = () => {
  const portfolios = [
    {
      id: 1,
      src: memory,
      url: '/memoryGame',
      github: 'https://github.com/Robertoeschdz/Memory-game'
    },
    {
      id: 2,
      src: delivery,
      url: '/delivery',
      github: 'https://github.com/Robertoeschdz/App-to-select-distributors'
    },
    {
      id: 3,
      src: survey,
      url: '/survey',
      github: 'https://github.com/Robertoeschdz/Surveys-app'
    },
    {
      id: 4,
      src: weather,
      url: '/weather',
      github: 'https://github.com/robertoeschdz/weather-app'
    },
    {
      id: 5,
      src: dino,
      url: '/dino',
      github: 'https://github.com/Robertoeschdz/Chrome-dinosaur-game'
    },
    {
      id: 6,
      src: cripto,
      url: '/cripto',
      github: 'https://github.com/Robertoeschdz/React-cripto'
    },
    {
      id: 7,
      src: quizzes,
      url: '/quiz',
      github: 'https://github.com/Robertoeschdz/Quizzes-app'
    },
    {
      id: 8,
      src: music,
      url: '/music',
      github: 'https://github.com/Robertoeschdz/Music-app'
    },
    {
      id: 9,
      src: chat,
      url: '/chat',
      github: 'https://github.com/Robertoeschdz/React-chat'
    }
  ]

  return (
    <div
      name='portfolio'
      className='bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen'
    >
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
            Portafolio
          </p>
          <p className='py-6'>Mira algunos de mis trabajos aquí</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0'>
          {portfolios.map(({ id, src, url, github }) => (
            <div key={id} className='shadow-md shadow-gray-600 rounded-lg'>
              <img
                src={src}
                alt=''
                className='rounded-md duration-200 hover:scale-105'
              />
              <div className='flex items-center justify-center flex-col sm:flex-row md:flex-row lg:flex-row'>
                <Link to={url} className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 px-6 sm:py-3 md:py-3 lg:py-3 m-4 duration-200 hover:scale-105'>
                  Demo
                </Link>
                <a href={github} target='_blank' rel='noreferrer' className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 px-6 sm:py-3 md:py-3 lg:py-3 m-4 duration-200 hover:scale-105'>
                  Codigo & Descripcion
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
