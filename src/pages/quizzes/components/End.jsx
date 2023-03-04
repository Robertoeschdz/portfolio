export default function End ({ hours, minutes, seconds, correct, questions, setActiveButton, setCorrect, setQuestionIndex, setTime }) {
  const handleRetry = () => {
    setActiveButton(null)
    setCorrect(0)
    setQuestionIndex(0)
    setTime(0)
  }

  return (
    <div className='p-6 h-screen'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-center mt-4 text-indigo-600 text-5xl font-semibold'>Results:</h1>
        <span className='text-2xl my-6'>Time: {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
        <h2 className='flex text-2xl'>Corrects:&nbsp;&nbsp;<p className={correct > questions.length / 2 ? 'text-success' : 'text-danger'}>{correct}</p></h2>
        {correct > questions.length / 2
          ? <h3 className='text-green-600 text-2xl my-2'>Congratulations, do you want to try again?</h3>
          : <h3 className='text-teal-300 text-2xl my-2'>Sorry, remember practice makes perfect</h3>}
        <button onClick={handleRetry} className={correct > questions.length / 2 ? 'border py-2.5 px-8 rounded mt-5 hover:border-green-900 hover:shadow-green-900 hover:shadow-lg' : 'border py-2.5 px-8 rounded mt-5 hover:border-red-900 hover:shadow-red-900 hover:shadow-lg'}>Retry</button>
      </div>
    </div>
  )
}
