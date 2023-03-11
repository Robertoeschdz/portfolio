export default function FinalsButtons ({ handleAgain, handleResults }) {
  return (
    <div>
      <button className='bg-sky-400 py-2.5 px-5 rounded mr-5' onClick={handleResults}>View results</button>
      <button className='bg-amber-600 py-2.5 px-5 rounded' onClick={handleAgain}>Try again</button>
    </div>
  )
}
