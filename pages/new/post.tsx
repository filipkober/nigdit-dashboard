import type { NextPage } from 'next'
import Navbar from '../../components/molecules/Navbar'
import NewPostForm from '../../components/organism/NewPostForm'
import { useRouter } from 'next/router';

const PostPage: NextPage = () => {

  return (
    <>
    <NewPostForm/>
    </>
  )
}

export default PostPage
