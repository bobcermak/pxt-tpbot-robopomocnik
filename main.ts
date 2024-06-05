//PROGRAM STRUCTURE

//menu start
let block: boolean = true

basic.forever(function() {
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
input.onLogoEvent(TouchButtonEvent.Pressed, function() {
    basic.clearScreen()
    block = false

    startSong()

    presetMode()
    basic.pause(200)
    driving()
})

//ENDING
