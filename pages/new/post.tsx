import type { NextPage } from 'next'
import Navbar from '../../components/molecules/Navbar'
import NewPostForm from '../../components/organism/NewPostForm'

const PostPage: NextPage = () => {
  return (
    <>
    <NewPostForm />
    </>
  )
}

export default PostPage
