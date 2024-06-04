//FUNCTIONS

//start preset
function presetMode() {
    PlanetX_AILens.initModule()
    PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Ball)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
}

//checking blackLine and if it is balls
let firstObserve: boolean = false;

function blackLineBalls(): void {
    while (!firstObserve) {
        toObserve()
        if (toObserve()) {
            firstObserve = true;
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 55);
            TPBot.stopCar();
        } 
        else if (TPBot.trackLine(TPBot.TrackingState.L_R_line)) {
            TPBot.setTravelSpeed(TPBot.DriveDirection.Forward, 40);
        } 
        else {
            TPBot.setWheels(40, -40);
        }
    }
}

//checking blackLine and if it is cards
function blackLineCards(): void {
    findCards()
    while (findCards() === "N") {
        findCards()
        if (findBalls() === findCards()) basic.showNumber(0) //bude fixnuti - nepamatuji si ze ma modrou kulicku
        else if (TPBot.trackLine(TPBot.TrackingState.L_R_line)) {
            TPBot.setTravelSpeed(TPBot.DriveDirection.Forward, 40);
        }
        else {
            TPBot.setWheels(40, -40);
        }
    }
}

//catching ball
let countBall: number = 0
let lockForCardsToGo: boolean = false

function catching(): void {
    let run: boolean = true

    while (run) {
        while (!checkIfBallCaught) {
            while (toObserve()) {
                for (let i = 0; i < 4; i++) {
                    TPBot.setWheels(20, 20)
                    basic.pause(150)
                    TPBot.stopCar()
                }
            }
            if (!toObserve() && firstObserve) {
                TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 150)
                checkIfBallCaught()
            }
        }
        if (!checkIfBallCaught) {
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
            basic.pause(500)
        }
        else if (checkIfBallCaught()) countBall++
    }
    run = false
    lockForCardsToGo = true
    TPBot.stopCar()
}


//checks if the ball is caught
function checkIfBallCaught(): boolean {
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 30)
    toObserve()
    return toObserve()
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
    if (blueCount > redCount && blueCount >= 2) statusBall = "B"
    else if (redCount > blueCount && redCount >= 2) statusBall = "R"
    else statusBall = "N"
    
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

function driving(): void {
    blackLineBalls()
    if (firstObserve) {  //sorting between blue and red
        findBalls()
        while (findBalls() === "N") {
            findBalls()
        }
        basic.showString(findBalls())
        catching()
    }
    if (lockForCardsToGo) {
        TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 120)
        PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Card)
        blackLineCards()
    }
    //catching function + servo
}