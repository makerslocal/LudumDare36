class Overworld {
  constructor (game) {
    this.game = game
    this.player = null
    this.background = null
    this.platforms = null
  }
  
  preload() {
      // load images, sounds
  }
  create() {
    this.game.stage.backgroundColor = "#5a3404";
    this.game.time.desiredFps = 30
    this.cursors = this.game.input.keyboard.createCursorKeys()
  }
  update() {
      // logical update
  }
  render() {
    this.game.debug.cameraInfo(this.game.camera, 32, 32)
  }
}