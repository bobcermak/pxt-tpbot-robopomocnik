//FUNCTIONS

//start preset
function presetMode() {
    PlanetX_AILens.initModule()
    PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Ball)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
}

//checking sonar and if it is balls
let firstObserve: boolean = false;

function sonarBalls(): void {
    while (!firstObserve) {
        if (toObserve()) {
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 55);
            TPBot.stopCar();
            basic.pause(1000)
            if (!toObserve()) {
                firstObserve = false
                TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
                TPBot.setTravelSpeed(TPBot.DriveDirection.Forward, 30);
            }
            else firstObserve = true
        } 
        else if (TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200) < 25) {
            TPBot.setWheels(-40, -40);
            basic.pause(500)
            TPBot.setWheels(40, -40);
        } 
        else TPBot.setTravelSpeed(TPBot.DriveDirection.Forward, 30);
    }
}

//checking sonar and if it is cards
let firstObserveCard: boolean = false
let allCountBall: number = 0

function sonarCards(): void {
    let isPlaced: boolean = false
    let distance: number = 0

    while (!isPlaced) {
        while (findCards() !== colorBall[0]) {
            TPBot.setWheels(30, -30)
            basic.pause(300)
            TPBot.stopCar()
            basic.pause(700)
        }
        if (findCards() === colorBall[0]) {
            firstObserveCard = true
            while (firstObserveCard) {
                TPBot.setWheels(25, 25)
                basic.pause(150)
                TPBot.stopCar()

                distance = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters)
                if (distance <= 15 && findCards() === colorBall[0]) {
                    TPBot.stopCar()
                    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
                    basic.pause(1000)
                    TPBot.setWheels(-40, -40)
                    basic.pause(500)
                    allCountBall++
                    isPlaced = true
                    break
                }
                if (findCards() !== colorBall[0]) {
                    firstObserveCard = false
                    TPBot.stopCar()
                    basic.pause(1000)
                    while (findCards() !== colorBall[0]) {
                        TPBot.setWheels(25, -25)
                        basic.pause(800)
                        TPBot.stopCar()
                        basic.pause(1000)
                        TPBot.setWheels(-25, 25)
                        basic.pause(800)
                        TPBot.stopCar()
                        basic.pause(1000)
                    }
                }
            }
        }
    }
}

//catching ball
let countBall: number = 0
let lockForCardsToGo: boolean = false

function catching(): void {
    let checkCaught: boolean = false
    while (!checkCaught) {
        while (toObserve()) {
            TPBot.setWheels(25, 25)
            basic.pause(150)
            TPBot.stopCar()
        }
        if (!toObserve() && firstObserve) {
            checkCaught = checkIfBallCaught()
            if (!checkCaught) {
                basic.pause(1000)
                finding()
            }
            else {
                TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 150)
                TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85);
                basic.pause(1000)
                let milis = control.millis()
                while (findBalls() !== colorBall[0] && (control.millis() - milis) < 26000) {
                    TPBot.setWheels(30, -30)
                    basic.pause(300)
                    TPBot.stopCar()
                    basic.pause(700)
                }
                if (findBalls() === colorBall[0]) {
                    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
                    checkCaught = false
                }
                else checkCaught = true
            }
        }
    }
        
lockForCardsToGo = true
TPBot.stopCar()
}

//checks if the ball is caught
function checkIfBallCaught(): boolean {
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 18)
    basic.pause(1000)
    return toObserve()
}

//when ball was not catch, robot is finding ball
function finding(): void {
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
    while (!toObserve()) {
        TPBot.setWheels(30, -30)
        basic.pause(300)
        TPBot.stopCar()
        basic.pause(700)
    }
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
let colorBall: Array<string> = []

function driving(): void {
    while (allCountBall < 2) {
        sonarBalls()
        if (firstObserve) {  //sorting between blue and red
            while (findBalls() === "N") {
                findBalls()
            }
            basic.showString(findBalls())
            colorBall.push(findBalls())

            catching()
            basic.pause(1500)
        }
        if (lockForCardsToGo) {
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 120)
            PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Color)
            sonarCards()
        }
    }
    
}
