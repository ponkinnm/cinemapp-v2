import stanley from "../img/kubrick.jpg"
import './LoadingScreen.css'

// TODO: Review (see open issue)
// Open Issue: Should it be separated to begin with?
export default function LoadingScreenView(){
    return <div>
        <img className={"rounded-corners"} alt={"stanley kubrick"} src={stanley}/>
        <div className={"centeredtext"}>LOADING GAME</div>
        </div>
}
