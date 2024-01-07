import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import { UserState } from '../store/userSlice'

const Ballin2: NextPage = () => {
    const count = useSelector((state: UserState) => state.count)
  return (
    <div>
      {count}
    </div>
  )
}

export default Ballin2
