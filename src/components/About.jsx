import React from 'react'
import text from '../assets/portfolio/text.json'
import { useGlobalContext } from '../context'

const About = () => {
  const { language } = useGlobalContext()

  return (
    <div
      name='about'
      className='w-full lg:h-screen md:h-screen bg-gradient-to-b from-gray-800 to-black text-white'
    >
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
            About
          </p>
        </div>

        <p className='text-xl mt-20'>
          {
            language === 'english' ? text.english.about1 : text.spanish.sobre1
          }
        </p>

        <br />

        <p className='text-xl'>
          {
            language === 'english' ? text.english.about2 : text.spanish.sobre2
          }
          <br />
          <br />
          {
            language === 'english' ? text.english.about3 : text.spanish.sobre3
          }
        </p>
      </div>
    </div>
  )
}

export default About
