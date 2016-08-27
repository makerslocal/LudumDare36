class Overworld {
  constructor (game) {
    this.game = game
    this.player = null
    this.background = null
    this.platforms = null
  }
  
  configureGame() {
    this.game.time.desiredFps = 30
    
    this.background = this.game.add.tileSprite(0, 0, 1024, 640, 'background')

    this.cursors = this.game.input.keyboard.createCursorKeys()
  }
  
  preload() {
      // load images, sounds
  }
  create() {
    this.configureGame()
  }
  update() {
      // logical update
  }
  render() {
    this.game.debug.cameraInfo(this.game.camera, 32, 32)
  }
}