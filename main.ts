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

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    block = false
    basic.pause(200)
    basic.clearScreen()

    startSong()

    presetMode()
    basic.pause(300)
    //scanning map
    while (blockWay) {
        let wayY = TPBot.sonarReturn(TPBot.SonarUnit.Centimeters)
        basic.showNumber(wayY)
        while (TPBot.sonarReturn(TPBot.SonarUnit.Centimeters) < (wayY / 2)) {
            TPBot.setTravelSpeed(TPBot.DriveDirection.Forward, 30);
        }
        TPBot.stopCar()
    }
    driving()
})

//ENDING