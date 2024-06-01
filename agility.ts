//FUNCTIONS

//start preset
function presetMode() {
    PlanetX_AILens.initModule()
    PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Ball)
}

//checking blackLine and if it is ball
let firstObserve: boolean = false

function blackLine(): void {
    while (!firstObserve) {
        toObserve()
        if (toObserve()) {
            firstObserve = true
            TPBot.stopCar()
        }
        if (TPBot.trackLine(TPBot.TrackingState.L_R_line) && !firstObserve) {
            TPBot.setTravelSpeed(TPBot.DriveDirection.Forward, 60)
        }
        if (!TPBot.trackLine(TPBot.TrackingState.L_R_line) && !firstObserve) {
            TPBot.setWheels(80, -80)
            basic.pause(400)
        }
    }
}

//sonar sensor
function sonar() {

}

//AI CAMERA

//find balls - colors
function findBalls(): string {
    let statusBall: string
    PlanetX_AILens.cameraImage()
    if (PlanetX_AILens.ballColor(PlanetX_AILens.ballColorList.Blue)) statusBall = "B"
    else if (PlanetX_AILens.ballColor(PlanetX_AILens.ballColorList.Red)) statusBall = "R"
    else statusBall = "N"
    return statusBall
}

//to observe ball
function toObserve(): boolean {
    PlanetX_AILens.cameraImage()
    return PlanetX_AILens.checkBall()
}

//find cards
function findCards(): string {
    let statusCard: string
    if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.blue)) statusCard = "B"
    else if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.red)) statusCard = "R"
    else statusCard = "N"
    return statusCard
}

//MAIN FUNCTIONS

//driving
function driving(): void {
    blackLine()
    if (firstObserve) basic.showString("Hello!")
    //catching function + servo
}