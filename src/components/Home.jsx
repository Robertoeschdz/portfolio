import React from 'react'
import HeroImage from '../assets/heroImage.webp'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-scroll'
import text from '../assets/portfolio/text.json'
import { useGlobalContext } from '../context'

const Home = () => {
  const { language } = useGlobalContext()

  return (
    <div
      name='home'
      className='bg-gradient-to-b from-black via-black to-gray-800 lg:h-screen md:h-screen w-full'
    >
      <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row'>
        <div className='flex flex-col justify-center h-full my-28'>
          <h2 className='text-4xl sm:text-7xl font-bold text-white'>
            {
              language === 'english' ? text.english.title : text.spanish.titulo
            }
          </h2>
          <p className='text-gray-500 py-4 max-w-md'>
            {
              language === 'english' ? text.english.description : text.spanish.descripcion
            }
          </p>

          <div>
            <Link
              to='portafolio'
              smooth
              duration={500}
              className='group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer'
            >
              {
                language === 'english' ? text.english.portfolio : text.spanish.portafolio
              }
              <span className='group-hover:rotate-90 duration-300'>
                <MdOutlineKeyboardArrowRight size={25} className='ml-1' />
              </span>
            </Link>
          </div>
        </div>

        <div>
          <img
            src={HeroImage}
            alt='my profile'
            className='rounded-2xl mx-auto w-2/3 md:w-full'
          />
        </div>
      </div>
    </div>
  )
}

export default Home
