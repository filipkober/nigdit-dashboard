import type { NextPage } from 'next'
import Head from 'next/head'
import NewPostForm from '../../components/organism/NewPostForm'
import { useRouter } from 'next/router';

const PostPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create new post</title>
        <link rel="icon" href={'/easterEgg1/blooddrop.svg'}/>
        <meta name="description" content="Create new post."/>
      </Head>
    <NewPostForm />
    </>
  )
}

export default PostPage
