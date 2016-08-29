class Start {
    constructor (game) {
        this.game = game
    }
    
    preload () {
        this.game.load.image('start', 'assets/sprites/start.png')
        this.game.load.spritesheet('sign', 'assets/sprites/start-button.png', 48, 58)
    }
    create () {
        this.game.add.image(0, 0, 'start')
        this.game.input.keyboard.onUpCallback = function (e) {
            this.beginGame()
        }.bind(this)
        this.game.input.mouse.mouseUpCallback = function (e) {
            this.beginGame()
        }.bind(this)
        
        this.timer = this.game.time.create(false)
        this.timer.loop(Start.FADE_TIMEOUT, this.beginGame.bind(this))
        
        this.sign = this.game.add.sprite(this.game.camera.width * 1/2 + 50, this.game.camera.height * 4/6, 'sign', 0)
        this.sign.scale.setTo(2, 2)
        this.sign.smoothed = false
        this.sign.animations.add('idle')
        this.sign.animations.play('idle', 5, true)
        
        this.overlay = this.game.add.graphics(0, 0)
        this.overlay.opacity = 0
    }
    update () {
        
    }
    render () {
        this.overlay.clear()
        this.overlay.beginFill(0x000000, this.overlay.opacity)
        this.overlay.moveTo(0, 0)
        this.overlay.drawRect(0, 0, this.camera.width, this.camera.height)
        this.overlay.endFill()
    }
    
    beginGame () {
        if(this.overlay.opacity >= 1) {
            this.game.input.keyboard.onUpCallback = function () {}
            this.game.input.mouse.mouseUpCallback = function () {}
            this.game.state.start('overworld')
        }
        else this.overlay.opacity += 0.1
        
        this.timer.start()
    }
}
    
Start.FADE_TIMEOUT = 100