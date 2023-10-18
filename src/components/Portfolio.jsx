import React from 'react'
import { Link } from 'react-router-dom'
import memory from '../assets/portfolio/memory.webp'
import delivery from '../assets/portfolio/delivery.webp'
import survey from '../assets/portfolio/survey.webp'
import weather from '../assets/portfolio/weather.webp'
import dino from '../assets/portfolio/dino.webp'
import cripto from '../assets/portfolio/cripto.webp'
import quizzes from '../assets/portfolio/quizzes.webp'
import music from '../assets/portfolio/music.webp'
import chat from '../assets/portfolio/chat.webp'
import text from '../assets/portfolio/text.json'
import { useGlobalContext } from '../context'

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

  const { language } = useGlobalContext()

  return (
    <div
      name='portafolio'
      className='bg-gradient-to-b from-black to-gray-800 w-full text-white'
    >
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
            {
              language === 'english' ? text.english.portfolio : text.spanish.portafolio
            }
          </p>
          <p className='py-6'>
            {
              language === 'english' ? text.english.work : text.spanish.trabajos
            }
          </p>
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
                  {
                    language === 'english' ? text.english.description3 : text.spanish.descripcion3
                  }
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
