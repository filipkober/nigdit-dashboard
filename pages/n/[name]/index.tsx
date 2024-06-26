import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import SubnigditDashboard from "../../../components/organism/SubnigditDashboard";


const SubnigditPage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  return <>
      <Head>
        <title>Nigdit</title>
        <link rel="icon" href={'/nigditLogo.svg'}/>
        <meta name="description" content="Subnigdit page."/>
      </Head>
      <SubnigditDashboard/>
  </>;
}

export default SubnigditPage;