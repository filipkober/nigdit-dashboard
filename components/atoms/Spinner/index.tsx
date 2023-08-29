import { SyncLoader } from "react-spinners";

export default function Spinner(){

    // czemu nazwałeś to spinner jak to się nawet nie kręci???

    return(
        <div><SyncLoader
        color="#ffffff"
        margin={5}
        speedMultiplier={0.7}
      /></div>
    )
}