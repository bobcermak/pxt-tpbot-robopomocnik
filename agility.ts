//FUNCTIONS

//start preset
function presetMode() {
    PlanetX_AILens.initModule()
    PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Ball)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
}

//checking sonar and if it is balls
let n: number = 0
let firstObserve: boolean = false

function sonarBalls(): void {
    while (!firstObserve) {
        if (!toObserve() && n < 20) {
            n++
            TPBot.setWheels(30, -27)
            basic.pause(300)
            TPBot.stopCar()
            basic.pause(700)
            if (n >= 20) {
                TPBot.setTravelTime(TPBot.DriveDirection.Forward, 30, 1)
                n = 0
            }
        }
        if (toObserve() && findBalls() !== colorBall[0]) {
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 52)
            TPBot.stopCar()
            basic.pause(1000)
            if (!toObserve()) {
                TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
                TPBot.setWheels(30, 30)
                basic.pause(500)
                TPBot.stopCar()
                basic.pause(500)
                if (toObserve() && findBalls() === colorBall[0]) {
                    firstObserve = true
                    TPBot.setWheels(25, 25)
                    basic.pause(150)
                    TPBot.stopCar()
                }
            }
            else {
                firstObserve = true
            }
        }
        else if (TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200) < 25) {
            TPBot.setWheels(-40, -37)
            basic.pause(500)
            TPBot.setWheels(40, -37)
        }
    }
}

//checking sonar and if it is cards
let firstObserveCard: boolean = false
let allCountBall: number = 0

function sonarCards(y: number, x: number): void {
    let isPlaced: boolean = false
    let yCheck: boolean = true
    let xCheck: boolean = false

    while (!isPlaced) {
        let distanceY = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)

        while (yCheck) {
            if (distanceY < (y / 2)) {
                while (distanceY <= ((y / 2) - 5) || distanceY >= ((y / 2) + 5)) {
                    TPBot.setWheels(-40, -37)
                    basic.pause(300)
                    TPBot.stopCar()
                    basic.pause(700)
                    distanceY = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
                }
            }
            else {
                while (distanceY > ((y / 2) + 5) || distanceY < ((y / 2) - 5)) {
                    TPBot.setWheels(40, 37)
                    basic.pause(300)
                    TPBot.stopCar()
                    basic.pause(700)
                    distanceY = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
                }
            }
            if (distanceY >= ((y / 2) - 5) && distanceY <= ((y / 2) + 5)) {
                TPBot.stopCar()
                basic.pause(1000)
                yCheck = false
                xCheck = true
            }
        }
        while (xCheck) {
            let distanceX: number = 0

            for (let i = 0; i < 3; i++) {
                TPBot.setWheels(30, -27)
                basic.pause(300)
                TPBot.stopCar()
                basic.pause(700)
            }
            distanceX = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
            basic.pause(1000)
            if (distanceX < (x / 2)) {
                while (distanceX <= ((x / 2) - 5) || distanceX >= ((x / 2) + 5)) {
                    TPBot.setWheels(-40, -37)
                    basic.pause(300)
                    TPBot.stopCar()
                    basic.pause(700)
                    distanceX = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
                }
            }
            else {
                while (distanceX > ((x / 2) + 5) || distanceX < ((x / 2) - 5)) {
                    TPBot.setWheels(40, 37)
                    basic.pause(300)
                    TPBot.stopCar()
                    basic.pause(700)
                    distanceX = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
                }
            }
            if (distanceX >= ((x / 2) - 5) && distanceX <= ((x / 2) + 5)) {
                TPBot.stopCar()
                xCheck = false
            }
        }
    }
}

//catching ball
let countBall: number = 0
let lockForCardsToGo: boolean = false
let checkCaught: boolean = false

function catching(): void {
    let milisFinding: number = control.millis()

    while (!checkCaught) {
        if (toObserve()) {
            milisFinding = control.millis()
            while (toObserve() && (control.millis() - milisFinding) < 6000) {
                TPBot.setWheels(25, 25)
                basic.pause(150)
                TPBot.stopCar()
            }
            if ((control.millis() - milisFinding) >= 6000) {
                checkIfBallCaught()
                if (checkIfBallCaught()) checkCaught = true
                else if (!checkIfBallCaught()) milisFinding = control.millis()
            }
        }
        else if (!toObserve() && firstObserve) {
            checkIfBallCaught()
            if (checkIfBallCaught()) checkCaught = true
            else {
                basic.pause(1000)
                finding()
            }
        }
    }
    lockForCardsToGo = true
    TPBot.stopCar()
}


//checks if the ball is caught
function checkIfBallCaught(): boolean {
    let countCheck: number = 0
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 20)
    if (toObserve()) {
        countCheck += 1
        TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 150)
        basic.pause(1000)
        if (toObserve() && countCheck === 1) {
            countCheck += 1
        }
    }

    return countCheck === 2
}

//when ball was not catch, robot is finding ball
function finding(): void {
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 70)
    while (findBalls() !== colorBall[allCountBall]) {
        for (let i = 0; i < 2; i++) {
            TPBot.setWheels(30, -30)
            basic.pause(300)
            TPBot.stopCar()
            basic.pause(700)
            checkIfBallCaught()
            if (checkIfBallCaught()) checkCaught = true
            basic.pause(1000)
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
            basic.pause(500)
        }
        basic.pause(500)
        for (let i = 0; i < 2; i++) {
            TPBot.setWheels(-30, 30)
            basic.pause(300)
            TPBot.stopCar()
            basic.pause(700)
            checkIfBallCaught()
            if (checkIfBallCaught()) checkCaught = true
            basic.pause(1000)
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
            basic.pause(500)
        }
    }
    // if ()
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
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

//MAIN FUNCTION

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
            sonarCards(wayY, wayX)
            presetMode()
            firstObserve = false
            if (allCountBall === 2) {
                TPBot.setWheels(40, -37)
                let milisSong: number = control.millis()
                while ((control.millis() - milisSong) < 32000) {
                    endSong()
                }
            }
            else continue
        }
    }
}
