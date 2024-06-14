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

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    block = false
    basic.pause(200)
    basic.clearScreen()

    startSong()

    presetMode()
    basic.pause(300)
    //scanning map
    let wayY = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
    TPBot.stopCar()
    basic.pause(500)
    TPBot.setTravelTime(TPBot.DriveDirection.Forward, 40, 1)
    TPBot.stopCar()
    for (let i = 0; i < 4; i++) {
        TPBot.setWheels(30, -30)
        basic.pause(300)
        TPBot.stopCar()
        basic.pause(700)
    }
    let wX: number = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
    basic.pause(1000)
    for (let i = 0; i < 8; i++) {
        TPBot.setWheels(30, -30)
        basic.pause(300)
        TPBot.stopCar()
        basic.pause(700)
    }
    let wX2: number = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 200)
    let wayX: number = wX + wX2 + 10
    basic.pause(500)
    driving()
})

//ENDING