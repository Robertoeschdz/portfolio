import { useEffect, useState } from 'react'
import GoHome from '../../../components/GoHome'
import { getData } from '../components/firestore'

export default function Results () {
  const [data, setData] = useState([])
  const [ranking, setRanking] = useState([])

  const fetch = async () => {
    const data = await getData()
    setData(data)
  }

  function errorsComparator (a, b) {
    return a.errors - b.errors
  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    const ranking = data.sort(errorsComparator)
    setRanking(ranking)
  }, [data])

  let counter = 1

  return (
    <div className='m-10 text-white'>
      <GoHome />
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider'>#</th>
            <th scope='col' className='px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider'>Username</th>
            <th scope='col' className='px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider'>Errors</th>
            <th scope='col' className='px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider'>Time</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map(item => (
            <tr key={item.username}>
              <th scope='row' className='border border-slate-600'>{counter++}</th>
              <td className='px-6 py-4 whitespace-nowrap text-sm border border-slate-600 font-medium'>{item.username}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm border border-slate-600'>{item.errors}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm border border-slate-600'>{item.minutes.toString().padStart(2, '0')}:{item.seconds.toString().padStart(2, '0')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
