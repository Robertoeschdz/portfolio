import { useEffect, useState } from 'react'
import './Cripto.css'
import TableCoins from './components/TableCoins'
import axios from 'axios'
import GoHome from '../../components/GoHome'

function Cripto () {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  const getData = async () => {
    const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    setCoins(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <GoHome />
      <div className='px-10 py-2.5 text-white'>
        <div className='grid'>
          <input type='text' placeholder='Search one cripto' className='rounded text-center text-black' onChange={e => setSearch(e.target.value)} />
          <TableCoins coins={coins} search={search} />
        </div>
      </div>
    </>
  )
}

export default Cripto
