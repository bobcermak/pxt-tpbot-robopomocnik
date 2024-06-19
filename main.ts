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

//MENU

let menuCount: number = 1
let logoStart: number = 0

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    block = false
    logoStart++
    basic.clearScreen()
    basic.pause(500)
    
    if (logoStart === 2) {
        startSong() // Start playing initial song
        if (menuCount === 1 || menuCount === 2) {
            scanningMap()
            menu()
        }
        else if (menuCount === 3 || menuCount === 4 || menuCount === 5) {
            menu()
        }
    }
})

//menu count++
input.onButtonPressed(Button.A, function() {
    if (!block && menuCount !== 1) {
        menuCount--
        control.inBackground(function () {
            music.play(music.tonePlayable(784, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        })
    } 
    
})

input.onButtonPressed(Button.B, function () {
    if (!block && menuCount !== 5) {
        menuCount++
        control.inBackground(function () {
            music.play(music.tonePlayable(880, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
        })
    }
})

//only menu count
basic.forever(function() {
    if (!block && logoStart < 2) {
        basic.showNumber(menuCount)
    }
})

