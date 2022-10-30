import { JoinButton } from "../../atoms/JoinButton";
import DashboardHeader from "../../molecules/DashboardHeader";
import SubnigditRules from "../../molecules/SubnigditRules";

export default function SubnigditDashboard() {
    return(
        <>
        {/* <JoinButton/> */}
        <div className=""><DashboardHeader /></div>

        <SubnigditRules id={0} />
        </>
    )
}