// -------------------- CAMERA OBJECT --------------------
/**
 * Global object that defines camera variables
 */
Camera = {
    wasScrolled: false,
    totalScroll: 0,
}


// -------------------- FUNCTIONS --------------------
/**
 * Scrolls the camera up to follow the player
 */
function scrollCamera() {
    const scroll = (arr, scrollAmt) => {
        arr.forEach(obj => {
            obj.y += scrollAmt
        })
    }

    let adjustment = Scene.height/2 - plr.y
    plr.updateCollisionPoints(0, adjustment)
    plr.y = Scene.height/2

    let yScroll = -plr.yVel 
    
    scroll(visiblePlatforms, yScroll)
    scroll(visibleEnemies, yScroll)
    scroll(visiblePowerups, yScroll)

    scroll(plr.projectiles, yScroll)

    // increases the player's score and gives the amount of pixels the screen scrolled
    updateScore(yScroll)

    Camera.wasScrolled = true
    Camera.totalScroll += yScroll
    Game.floorKills = true
}