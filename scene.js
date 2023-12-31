// -------------------- SCENE OBJECT --------------------
/**
 * Global object that defines important scene variables
 */
let Scene = {
    width: undefined,
    height: undefined,

    leftBorder: undefined,
    rightBorder: undefined,

    xOffset: undefined,

    floorHeight: undefined,
    backgroundOffset: 0,
    backgroundSprite: undefined
}


// -------------------- FUNCTIONS --------------------
/**
 * Sets y position of the floor
 */
function setFloor(y) {
    Scene.floorHeight = y
}


/**
 * Sets the game scene's dimensions (seperate from window dimensions) and initialises border positions
 */
function setSceneDimensions(x, y) {
    Scene.width = x
    Scene.height = y

    Scene.xOffset = (windowWidth / 2) - (Scene.width / 2)
    Scene.leftBorder = Scene.xOffset
    Scene.rightBorder = Scene.xOffset + Scene.width
}


/**
 * Draws border to fill window space not covered by the scene
 */
function drawWindowBorder() {
    stroke(0)
    fill(100)

    const halfScreen = windowWidth / 2

    // rect(x, y, w, h)
    rect(0, 0, 
         halfScreen - (Scene.width/2), Scene.floorHeight)

    rect(halfScreen + (Scene.width/2), 0, 
         windowWidth, Scene.floorHeight)
}


/**
 * Draws and applies parallax to background
 */
function drawBackground() {
    tint(Game.heightTint)

    sprite(Scene.backgroundSprite, Scene.leftBorder, Scene.backgroundOffset, Scene.width, Scene.height)
    sprite(Scene.backgroundSprite, Scene.leftBorder, Scene.backgroundOffset - Scene.height, Scene.width, Scene.height)
    
    Scene.backgroundOffset = (Camera.totalScroll / 3) % Scene.height
    
    noTint()
}


/**
 * Sets scene's background sprite
 * @param {String} sprite image url of sprite
 */
function setBackgroundSprite(sprite) {
    Scene.backgroundSprite = sprite
}