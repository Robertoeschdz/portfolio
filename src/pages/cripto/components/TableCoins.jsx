import CoinRow from './CoinRow'

const titles = ['#', 'Coin', 'Price', 'Price Change', '24h Volume']

const TableCoins = ({ coins, search }) => {
  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase()) | coin.symbol.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <table className='border-collapse'>
      <thead>
        <tr>
          {
                        titles.map(title => (
                          <th className='p-3 border-b border-gray-400 uppercase' key={title}>{title}</th>
                        ))
                    }
        </tr>
      </thead>
      <tbody>
        {filteredCoins.map((coin, index) => (
          <CoinRow coin={coin} key={coin.name} index={index + 1} />
        ))}
      </tbody>
    </table>
  )
}

export default TableCoins
