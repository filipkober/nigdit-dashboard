import type { NextPage } from 'next';
import Head from 'next/head';
import NewPostForm from '../../components/organism/NewPostForm';

const PostPage: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create new post</title>
        <link rel="icon" href={'/nigditLogo.svg'}/>
        <meta name="description" content="Create new post."/>
      </Head>
    <NewPostForm />
    </>
  )
}

export default PostPage
