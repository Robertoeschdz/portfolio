import { IoMdHome } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function GoHome () {
  return (
    <Link to='/'><div className='p-3'><IoMdHome size={38} color='#fff' /></div></Link>
  )
}
