//PROGRAM STRUCTURE

//menu start
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

//MAIN
let blockWay: boolean = true
let blockWayY: boolean = true

let wayY: number
let wayX: number

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    block = false
    basic.pause(200)
    basic.clearScreen()

    startSong()

    presetMode()
    basic.pause(300)
    //scanning map
    basic.showString("L")
    wayY = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200) + 10
    TPBot.stopCar()
    basic.pause(500)
    TPBot.setTravelTime(TPBot.DriveDirection.Forward, 40, 2)
    TPBot.stopCar()
    basic.pause(500)

    for (let i = 0; i < 4; i++) {
        TPBot.setWheels(30, -27)
        basic.pause(300)
        TPBot.stopCar()
        basic.pause(700)
    }

    wayX += TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
    basic.pause(1000)
    for (let i = 0; i < 8; i++) {
        TPBot.setWheels(30, -27)
        basic.pause(300)
        TPBot.stopCar()
        basic.pause(700)
    }

    wayX += TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200) + 10
    basic.pause(500)
    basic.clearScreen()
    //Main function driving
    driving()
})

//ENDING