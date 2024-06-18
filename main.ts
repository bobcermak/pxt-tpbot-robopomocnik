// PROGRAM STRUCTURE

// Menu start with flashing LED pattern
let block: boolean = true

basic.forever(function () {
    if (block) {
        basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        `)
        basic.pause(300)
        basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
        basic.pause(700)
    }
})

// MAIN FUNCTION

// Flags for controlling program flow
let blockWay: boolean = true
let blockWayY: boolean = true

// Variables for storing way coordinates
let wayY: number
let wayX: number

// Event handler for starting the program
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    block = false
    basic.pause(200)
    basic.clearScreen()

    startSong() // Start playing initial song

    presetMode() // Set preset mode for TPBot
    basic.pause(300)

    // Scanning map and setting initial coordinates
    basic.showString("L")
    wayY = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200) + 10
    TPBot.stopCar()
    basic.pause(500)
    TPBot.setTravelTime(TPBot.DriveDirection.Forward, 40, 2)
    TPBot.stopCar()
    basic.pause(500)

    // Rotating to find the X-axis coordinate
    for (let i = 0; i < 4; i++) {
        TPBot.setWheels(30, -27)
        basic.pause(300)
        TPBot.stopCar()
        basic.pause(700)
    }

    let wX = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
    basic.pause(1000)

    // Further rotating to refine the X-axis coordinate
    for (let i = 0; i < 7; i++) {
        TPBot.setWheels(30, -27)
        basic.pause(300)
        TPBot.stopCar()
        basic.pause(700)
    }

    let wX2 = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200) + 10
    wayX = wX + wX2
    basic.pause(500)
    basic.clearScreen()

    // Main function to start driving the robot
    driving()
})

//ENDING