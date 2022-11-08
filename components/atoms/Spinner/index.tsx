import { SyncLoader } from "react-spinners";

export default function Spinner(){
    return(
        <div><SyncLoader
        color="#ffffff"
        margin={5}
        speedMultiplier={0.7}
      /></div>
    )
}