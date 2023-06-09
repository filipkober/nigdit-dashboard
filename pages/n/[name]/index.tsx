import { NextPage } from "next";
import { useRouter } from "next/router";
import Navbar from "../../../components/molecules/Navbar";
import SubnigditDashboard from "../../../components/organism/SubnigditDashboard";


const SubnigditPage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  return <>

      <SubnigditDashboard />
  </>;
}

export default SubnigditPage;