
//Functions


// start preset
function presetMode() {
    PlanetX_AILens.initModule()
    PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Ball)
}

// checking blackLine
function blackLine() {

}

// sonar sensor
function sonar() {

}


// AI camera

// find balls - colors

function findBalls(): string {
    let statusBall: string
    PlanetX_AILens.cameraImage()
    if (PlanetX_AILens.ballColor(PlanetX_AILens.ballColorList.Blue)) statusBall = "B"
    else if (PlanetX_AILens.ballColor(PlanetX_AILens.ballColorList.Red)) statusBall = "R"
    else statusBall = "N"
    return statusBall
}

//to observe ball

function toObserve(): boolean {
    PlanetX_AILens.cameraImage()
    if (PlanetX_AILens.checkBall()) return true
    else return false
}

//find cards

function findCards(): string {
    let statusCard: string
    if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.blue)) statusCard = "B"
    else if (PlanetX_AILens.colorCheck(PlanetX_AILens.ColorLs.red)) statusCard = "R"
    else statusCard = "N"
    return statusCard                                                                                                                                                                                                                                                                                
}

//MAIN FUNCTIONS

//catching ball

let firstObserve: boolean = false

function catching(): void {
    basic.forever(function() {
        toObserve()
        while(!toObserve() && !firstObserve) {
            for (let i = 0; i < 2; i++) {
                TPBot.setTravelTime(TPBot.DriveDirection.Forward, 50, 2)
                basic.pause(500)
            }
            TPBot.setWheels(100, -100)
            basic.pause(500)
        }
        if (toObserve()) {
            firstObserve = true
            TPBot.stopCar()
            basic.pause(1000)
        }
    })
    
}


































