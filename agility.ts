//FUNCTIONS

//start preset
function presetMode() {
    PlanetX_AILens.initModule()
    PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Ball)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
}

//checking blackLine and if it is ball
let firstObserve: boolean = false

function blackLine(): void {
    while (!firstObserve) {
        toObserve()
        if (toObserve()) {
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 42)
            firstObserve = true
            TPBot.stopCar()
        }
        if (TPBot.trackLine(TPBot.TrackingState.L_R_line) && !firstObserve) {
            TPBot.setTravelSpeed(TPBot.DriveDirection.Forward, 40)
        }
        if (!TPBot.trackLine(TPBot.TrackingState.L_R_line) && !firstObserve) {
            TPBot.setWheels(40, -40)
        }
    }
}

//catching - drive slowly and catch Ball

function catching(): void {
    
}

//sonar sensor
function sonar() {

}

//AI CAMERA

//find balls - colors
function findBalls(): string {
    let blueCount: number = 0
    let redCount: number = 0

    let statusBall: string

    for (let i = 0; i < 12; i++) {
        PlanetX_AILens.cameraImage()
        if (PlanetX_AILens.ballColor(PlanetX_AILens.ballColorList.Blue)) blueCount++  
        else if (PlanetX_AILens.ballColor(PlanetX_AILens.ballColorList.Red)) redCount++ 
    }
    if (blueCount > redCount && blueCount >= 3) statusBall = "B"
    else if (redCount > blueCount && redCount >= 3) statusBall = "R"
    
    return statusBall
}



//to observe ball
function toObserve(): boolean {
    let ballCount: number = 0

    for (let i = 0; i < 12; i++) {
        PlanetX_AILens.cameraImage()
        if (PlanetX_AILens.checkBall()) ballCount++
    }

    return ballCount >= 3
}


//find cards
function findCards(): string {
    let blueCardCount: number = 0
    let redCardCount: number = 0

    let statusCard: string

    for (let i = 0; i < 12; i++) {
        PlanetX_AILens.cameraImage()
        if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.blue)) blueCardCount++
        else if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.red)) redCardCount++
    }
    if (blueCardCount > redCardCount && blueCardCount >= 3) statusCard = "B"
    else if (redCardCount > blueCardCount && redCardCount >= 3) statusCard = "R"
    else statusCard = "N"

    return statusCard
}



//MAIN FUNCTIONS

//driving
let blue: number = 0
let red: number = 0

function driving(): void {
    blackLine()
    if (firstObserve) {  //sorting between blue and red
        for (let i = 0; i < 3; i++) {
            findBalls()
            if (findBalls() === "B") blue++
            else red++
        }
        if (blue > red) basic.showString("B")
        else if (red > blue) basic.showString("R")
    }
    //catching function + servo
}