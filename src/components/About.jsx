import React from 'react'

const About = () => {
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
          ¡Hola! Soy Roberto, desarrollador junior full stack
          apasionado por la tecnología y la creación de soluciones innovadoras.
          Me encanta aprender y estar al día con las últimas tendencias y tecnologías,
          y estoy constantemente buscando nuevas formas de mejorar mis habilidades y conocimientos.
        </p>

        <br />

        <p className='text-xl'>
          Mi experiencia en desarrollo web abarca tanto front-end como back-end,
          y tengo experiencia trabajando con Es6, React, Node.js, Express,
          y MongoDB.
          <br />
          <br />
          Si buscas a alguien apasionado por el desarrollo web
          y que se comprometa con su trabajo, no dudes en contactar conmigo.
        </p>
      </div>
    </div>
  )
}

export default About
