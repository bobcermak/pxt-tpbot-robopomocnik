//start preset
function presetMode() {
    // Initialize the PlanetX AI Lens module
    PlanetX_AILens.initModule()
    // Switch AI Lens function to detect balls
    PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Ball)
    // Set servo S1 to initial position (85 degrees)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
    // Set servo S2 to initial position (240 degrees)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
}

//checking sonar and if it is balls
let n: number = 0
let firstObserve: boolean = false

function sonarBalls(): void {
    // Check sonar until first observation of balls
    while (!firstObserve) {
        if (!toObserve() && n < 20) {
            // Move forward to find balls
            n++
            TPBot.setWheels(30, -27)
            basic.pause(300)
            TPBot.stopCar()
            basic.pause(700)
            if (n >= 20) {
                // Move forward if no balls detected after 20 attempts
                TPBot.setTravelTime(TPBot.DriveDirection.Forward, 30, 1)
                n = 0
            }
        }
        if (toObserve() && findBalls() !== colorBall[0]) {
            // If balls are observed and not of the desired color, adjust servo and position
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 52)
            TPBot.stopCar()
            basic.pause(1000)
            if (!toObserve()) {
                // Move forward to find balls of desired color
                TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 85)
                TPBot.setWheels(30, 27)
                basic.pause(500)
                TPBot.stopCar()
                basic.pause(500)
                if (toObserve() && findBalls() === colorBall[0]) {
                    // Once desired balls are observed, set flag for first observation
                    firstObserve = true
                    TPBot.setWheels(25, 22)
                    basic.pause(150)
                    TPBot.stopCar()
                }
            } 
            else {
                firstObserve = true
            }
        } 
        if (toObserve() && findBalls() === colorBall[0]) {
            TPBot.setWheels(30, -27)
            basic.pause(300)
            TPBot.stopCar()
            basic.pause(700)
        }
        else if (TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200) < 25) {
            // If obstacle detected, perform avoidance maneuver
            TPBot.setWheels(-40, -37)
            basic.pause(500)
            TPBot.setWheels(40, -37)
        }
    }
}

// Checking sonar and if it is cards
let firstObserveCard: boolean = false
let allCountBall: number = 0
let checkEnd: boolean = false

let isPlaced: boolean = false
let yCheck: boolean = true
let xCheck: boolean = false

function sonarCards(y: number, x: number): void {
    // Use sonar to align and place cards
    while (!isPlaced) {
        let distanceY = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)

        // Check Y-axis alignment
        while (yCheck) {
            if (distanceY < (y / 2)) {
                // Adjust position if Y-axis alignment is off
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

        // Check X-axis alignment
        while (xCheck) {
            for (let i = 0; i < 3; i++) {
                TPBot.setWheels(40, -37)
                basic.pause(300)
                TPBot.stopCar()
                basic.pause(700)
            }
            basic.pause(1000)
            let distanceX = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
            basic.pause(1000)
            if (distanceX < (x / 2)) {
                // Adjust position if X-axis alignment is off
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
                basic.pause(1000)
                xCheck = false
            }
        }

        // Check if the ball is the same color as the card
        while (!xCheck && colorBall[allCountBall] !== findCards() && !checkEnd) {
            // Perform rotation 3 times
            TPBot.setWheels(35, -32)
            basic.pause(150)
            TPBot.stopCar()
            basic.pause(1000)
            while (colorBall[allCountBall] === findCards() && !checkEnd) {
                TPBot.setWheels(25, 22)
                basic.pause(150)
                TPBot.stopCar()
                basic.pause(500)
                while (colorBall[allCountBall] !== findCards()) {
                    for (let i = 0; i < 2; i++) {
                        TPBot.setWheels(-35, 32)
                        basic.pause(150)
                        TPBot.stopCar()
                        basic.pause(1000)
                    }
                    for (let i = 0; i < 2; i++) {
                        TPBot.setWheels(35, -32)
                        basic.pause(150)
                        TPBot.stopCar()
                        basic.pause(1000)
                    }
                }
                if (colorBall[allCountBall] === findCards() && TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200) < 20) {
                    checkEnd = true
                }
            }
        }
        if (checkEnd) {
            // Final actions after placing the card
            TPBot.stopCar()
            basic.pause(1000)
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
            basic.pause(1000)
            TPBot.setWheels(-40, -37)
            basic.pause(2000)
            TPBot.stopCar()
            allCountBall++
            basic.showNumber(allCountBall)
            isPlaced = true
            break
        }
    }
}

//AI camera

// Catching ball
let countBall: number = 0
let lockForCardsToGo: boolean = false
let checkCaught: boolean = false

function catching(): void {
    let milisFinding: number = control.millis()

    // Loop until the ball is caught
    while (!checkCaught) {
        // If there's a ball to observe
        if (toObserve()) {
            milisFinding = control.millis()
            // Loop while observing the ball within a time limit
            while (toObserve() && (control.millis() - milisFinding) < 6000) {
                TPBot.setWheels(25, 22)
                basic.pause(150)
                TPBot.stopCar()
            }
            // If time limit exceeded, check if the ball is caught
            if ((control.millis() - milisFinding) >= 6000) {
                checkIfBallCaught()
                if (checkIfBallCaught()) checkCaught = true
                else if (!checkIfBallCaught()) milisFinding = control.millis()
            }
        }
        // If no ball to observe and it's the first observation
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

// Checks if the ball is caught
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

// When the ball is not caught, the robot finds the ball
function finding(): void {
    let observeFind: boolean = false;
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240);
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 70);
    let milisRotate: number = control.millis();

    // Loop to find the ball within a time limit
    while (findBalls() !== colorBall[allCountBall] && (control.millis() - milisRotate) < 20000) {
        TPBot.setWheels(-30, 27);
        basic.pause(300);
        TPBot.stopCar();
        basic.pause(700);
    }
    // If the ball is found
    if (findBalls() === colorBall[allCountBall]) {
        observeFind = true; // Ball found
    }

    // If time limit exceeded
    if ((control.millis() - milisRotate) >= 20000) {
        observeFind = false; // Time limit exceeded
    }

    // If observed, continue searching with sonar
    if (observeFind) {
        sonarBalls(); // Continue searching using sonar
    }
}


// Function to find balls based on their colors using AI camera
function findBalls(): string {
    let blueCount: number = 0
    let redCount: number = 0
    let statusBall: string

    // Capture camera image and count blue and red balls
    for (let i = 0; i < 12; i++) {
        PlanetX_AILens.cameraImage()
        if (PlanetX_AILens.ballColor(PlanetX_AILens.ballColorList.Blue)) blueCount++
        else if (PlanetX_AILens.ballColor(PlanetX_AILens.ballColorList.Red)) redCount++
    }

    // Determine ball status based on counts
    if (blueCount > redCount && blueCount >= 2) statusBall = "B" // More blue balls
    else if (redCount > blueCount && redCount >= 2) statusBall = "R" // More red balls
    else statusBall = "N" // No clear dominant color

    return statusBall
}

// Function to observe if there are enough balls present
function toObserve(): boolean {
    let ballCount: number = 0

    // Capture camera image and count detected balls
    for (let i = 0; i < 12; i++) {
        PlanetX_AILens.cameraImage()
        if (PlanetX_AILens.checkBall()) ballCount++
    }

    return ballCount >= 3 // Return true if 3 or more balls are detected
}

// Function to find cards based on their colors using AI camera
function findCards(): string {
    let blueCardCount: number = 0
    let redCardCount: number = 0
    let statusCard: string

    // Capture camera image and count blue and red cards
    for (let i = 0; i < 12; i++) {
        PlanetX_AILens.cameraImage()
        if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.blue)) blueCardCount++
        else if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.red)) redCardCount++
    }

    // Determine card status based on counts
    if (blueCardCount > redCardCount && blueCardCount >= 3) statusCard = "B" // More blue cards
    else if (redCardCount > blueCardCount && redCardCount >= 3) statusCard = "R" // More red cards
    else statusCard = "N" // No clear dominant color

    return statusCard
}

// MAIN FUNCTION

// Array to store detected ball colors
let colorBall: Array<string> = []

// Main driving function controlling robot actions
function driving(): void {
    while (allCountBall < 2) {
        sonarBalls()
        if (firstObserve) { // Sorting between blue and red balls
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
            checkEnd = false
            firstObserve = false
            isPlaced = false
            yCheck = true
            xCheck = false
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


            