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
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    block = false
    basic.pause(200)
    basic.clearScreen()

    startSong()

    presetMode()
    basic.pause(300)
    driving()
})

//ENDING