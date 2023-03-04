import styles from '../deliveryApp.module.css'
import deliveryImg from '../assets/delivery.webp'

export default function DeliveryIcon ({ availableDealers }) {
  return (
    <div className='flex items-center'>
      <div className={styles.deliverimg}>
        <img width='30' src={deliveryImg} style={{ backgroundColor: 'transparent' }} alt='Delivery icon' />
      </div>
      <p className='text-green-600 text-3xl ml-4'>{availableDealers}/8</p>
    </div>
  )
}
