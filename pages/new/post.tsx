import type { NextPage } from 'next'
import Navbar from '../../components/molecules/Navbar'
import NewPostForm from '../../components/organism/NewPostForm'

const PostPage: NextPage = () => {
  return (
    <>
    <Navbar searchbar={{
              value: undefined,
              onChange: function (str: string): void {
                  throw new Error('Function not implemented.')
              }
          }} />
    <NewPostForm />
    </>
  )
}

export default PostPage
