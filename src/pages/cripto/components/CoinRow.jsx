import './coinRow.css'

const CoinRow = ({ coin, index }) => {
  return (
    <tr className='hover:bg-gray-900'>
      <td className='p-3 border-t border-gray-400 border-b-0'>{index}</td>
      <td className='p-3 border-t border-gray-400 border-b-0 flex'>
        <img src={coin.image} alt={coin.name} className='cripto-icon mr-2' />
        <span>{coin.name}</span>
        <span className='ml-3 uppercase'>{coin.symbol}</span>
      </td>
      <td className='p-3 border-t border-gray-400 border-b-0'>{coin.current_price}</td>
      <td className={coin.price_change_percentage_24h > 0 ? 'p-3 border-t border-gray-400 border-b-0 text-green-600' : 'p-3 border-t border-gray-400 border-b-0 text-red-600'}>{coin.price_change_percentage_24h}</td>
      <td className='p-3 border-t border-gray-400 border-b-0'>{coin.total_volume}</td>
    </tr>
  )
}

export default CoinRow
