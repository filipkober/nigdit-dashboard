import type { NextPage } from 'next'
import { useState } from 'react'
import CustomButton from '../components/atoms/CustomButton'
import DivByTwo from '../components/atoms/DivByTwo'

const Home: NextPage = () => {
  const [liczbaKlikniec, setLiczbaKlikniec] = useState<number>(0)
  const zmienna = [{name: "a"}, {name: "b"}, {name: "c"}]
  return (
    <>
    <CustomButton liczbaKlikniec={liczbaKlikniec} setLiczbaKlikniec={setLiczbaKlikniec} />
    <DivByTwo number={liczbaKlikniec} />
    {
      zmienna.map((zm) => {
        if(zm.name === "a" || zm.name === "b") return zm.name
      })
    }
    </>

  )
}

export default Home
