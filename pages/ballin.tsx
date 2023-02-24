import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Reply from '../components/atoms/Reply'
import { StrapiReply } from '../models/Reply'
import StrapiResponse, { strapiResponseToData } from '../models/StrapiResponse'
import { incrementCounter } from '../store/userSlice'

const Ballin: NextPage = () => {

  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(incrementCounter())
  }

  const [replies, setReplies] = useState<StrapiReply[]>([])

  useEffect(() => {
    fetch('http://localhost:1338/api/replies').then((res) => {
      res.json().then((data: StrapiResponse<StrapiReply[]>) => {
        setReplies(strapiResponseToData(data))
      })
    })
  }, [])

  console.log(replies)

  return (
    <div>
      <button onClick={onClick}>Klik klik</button>
      {replies.map((reply) => (
        <Reply key={reply.id} id={reply.id} votes={reply.attributes.votes} pfp={''} nick={''} content={reply.attributes.content} responseTo={0}  />
      ))}
    </div>
  )
}

export default Ballin
