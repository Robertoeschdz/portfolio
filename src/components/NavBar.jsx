import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-scroll'
import text from '../assets/portfolio/text.json'
import { useGlobalContext } from '../context'
import '../assets/portfolio/styles.css'

const NavBar = () => {
  const [nav, setNav] = useState(false)

  const { language, setLanguage } = useGlobalContext()

  const portafolio = (language === 'english') ? text.english.portfolio : text.spanish.portafolio
  const experiencia = (language === 'english') ? text.english.experience : text.spanish.experiencia
  const contacto = (language === 'english') ? text.english.contact : text.spanish.contacto

  const links = [
    {
      id: 1,
      link: 'home',
      text: 'home'
    },
    {
      id: 2,
      link: 'about',
      text: 'about'
    },
    {
      id: 3,
      link: 'portafolio',
      text: portafolio
    },
    {
      id: 4,
      link: 'experiencia',
      text: experiencia
    },
    {
      id: 5,
      link: 'contacto',
      text: contacto
    }
  ]

  const changeLanguage = () => {
    const newLanguage = (language === 'english') ? 'español' : 'english'
    setLanguage(newLanguage)
  }
  return (
    <div className='flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed'>
      <div>
        <h1 className='text-5xl font-signature ml-2'>Roberto</h1>
      </div>

      <div className='flex'>
        <ul className='hidden md:flex'>
          {links.map(({ id, link, text }) => (
            <li
              key={id}
              className='px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200'
            >
              <Link to={link} smooth duration={500}>
                {text}
              </Link>
            </li>
          ))}
        </ul>

        <div
          onClick={() => setNav(!nav)}
          className='cursor-pointer pr-4 z-10 text-gray-500 md:hidden'
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500'>
            {links.map(({ id, link }) => (
              <li
                key={id}
                className='px-4 cursor-pointer capitalize py-6 text-4xl'
              >
                <Link
                  onClick={() => setNav(!nav)}
                  to={link}
                  smooth
                  duration={500}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <label for='dark-toggle' class='flex items-center cursor-pointer'>
          <div class='relative'>
            <input type='checkbox' id='dark-toggle' class='checkbox hidden' onClick={changeLanguage} />
            <div class='block border-[1px] dark:border-white border-gray-900 w-14 h-8 rounded-full' />
            <span class='absolute left-1.5 top-1.5 text-slate-500 font-bold text-sm'>EN</span>
            <span class='absolute right-2 top-1.5 text-slate-500 font-bold text-sm'>ES</span>
            <div class='dot absolute left-1 top-1 bg-blue-200 w-6 h-6 rounded-full transition' />
          </div>
        </label>
      </div>
    </div>
  )
}

export default NavBar
