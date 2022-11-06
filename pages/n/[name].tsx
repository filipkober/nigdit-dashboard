import { NextPage } from "next";
import { useRouter } from "next/router";
import Navbar from "../../components/molecules/Navbar";
import SubnigditDashboard from "../../components/organism/SubnigditDashboard";


const SubnigditPage: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  return <>
  <Navbar searchbar={{
          value: undefined,
          onChange: function (str: string): void {
              throw new Error("Function not implemented.");
              //ladny komentarz
          }
      }}  />

      <SubnigditDashboard />
  </>;
}

export default SubnigditPage;