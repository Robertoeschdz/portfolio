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
          Hello! I'm Roberto, a junior full stack developer
          passionate about technology and creating innovative solutions.
          I love learning and keeping up with the latest trends and technologies,
          and am constantly looking for new ways to improve my skills and knowledge.
        </p>

        <br />

        <p className='text-xl'>
          My web development background spans both front-end and back-end,
          and I have experience working with Es6, React, Node.js, Express,
          and MongoDB.
          <br />
          <br />
          If you are looking for someone who is passionate about web development
          and who is committed to their work, do not hesitate to contact me.
        </p>
      </div>
    </div>
  )
}

export default About
