import { useState } from "react"

export const Training = () => {
    const [training,setTraining] = useState([])
    
    return (
        <>
            <div class='trainingPageContainer'>
                <div className="sideMenuContainer">
                    <div className="sideMenuTitle"> wittball</div>
                    <img></img>
                    {training.map(() => {
                        return (
                            <>
                            //
                            </>
                        )
                    })}
                </div>
                <div className="mainTrainingWrap">
                    <div className="maintrainingTitle"> asdas</div>
                    <img></img>
                    <div className="mainTrainingInfo"> asdas</div>
                </div>
            </div>

        </>
    )
}