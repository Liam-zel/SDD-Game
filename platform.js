// -------------------- CLASSES --------------------
/**
 * Base platform class
 */
class Platform {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.w = 80
        this.h = 12

        this.col = '#C0FF3E'

        this.attachedPowerup = undefined
    }

    draw() {
        strokeWeight(3)
        fill(this.col)
        rect(this.x, this.y, this.w, this.h)
    }

    // generic function to run every frame alongside draw
    update() {}

    onCollision(plr) {
        plr.jump()
    }
}


/**
 * Can only be jumped on a single time
 */
class BreakablePlatform extends Platform {
    constructor(x,y) {
        super(x,y) // calls the constructor function from the original platform class

        this.col = '#FFD700'
        this.broken = false
    }

    onCollision(plr) {
        if (!this.broken) plr.jump()

        this.break()
    }

    break() {
        this.col = '#7F6B00'
        this.broken = true
    }
}


/**
 * Moves left and right, changes direction when it reaches the end of the screen
 */
class movingPlatform extends Platform {
    constructor(x,y) {
        super(x,y) // calls the constructor function from the original platform class

        this.col = '#9999FF'

        this.direction = floor(random(2))-1 || 1
        this.moveSpeed = 2
    }

    update() {
        this.x += this.moveSpeed * this.direction

        if (this.x + this.w > Scene.rightBorder || this.x < Scene.leftBorder) {
            this.direction *= -1
        }
    }
}


// -------------------- FUNCTIONS --------------------
/**
 * Generates a platform with random type, x position and y position
 */
function generatePlatform() {
    // platforms can generate too far in advance, this prevents that
    if (activePlatforms.length > 0 && activePlatforms[activePlatforms.length-1].y < -500) return

    // array of functions
    const platformTypes = [
        (x, y) => {return new Platform(x, y)},
        (x, y) => {return new BreakablePlatform(x, y)},
        (x, y) => {return new movingPlatform(x, y)},
    ]

    let index = floor(random(platformTypes.length))

    let x = floor(random(Scene.leftBorder, Scene.rightBorder - 80))

    // y position of previous platform, otherwise its the floors y position
    let previousY = Scene.floorHeight - 70
    if (activePlatforms.length > 0) previousY = activePlatforms[activePlatforms.length-1].y

    let y = floor(random(previousY, previousY-130))

    activePlatforms.push( platformTypes[index](x, y) )
}


/**
 * Checks if any platforms are below the screen, and if so, deletes them
 */
function deletePlatforms() {
    activePlatforms.forEach(platform => {

        if (platform.y > Scene.height) {
            activePlatforms.splice(activePlatforms.indexOf(platform), 1)
        }

    })
}