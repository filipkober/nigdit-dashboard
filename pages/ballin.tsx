import type { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import { incrementCounter } from '../store/userSlice'

const Ballin: NextPage = () => {

  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(incrementCounter())
  }



  return (
    <div>
      <button onClick={onClick}>Klik klik</button>
    </div>
  )
}

export default Ballin
