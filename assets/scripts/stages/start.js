class Start {
    constructor (game) {
        this.game = game
    }
    
    preload () {
        this.game.load.image('start', 'assets/sprites/start.png')
    }
    create () {
        this.game.add.image(0, 0, 'start')
        this.game.input.enabled = true
        this.game.input.keyboard.onUpCallback = function (e) {
            this.beginGame()
        }.bind(this)
        this.game.input.mouse.mouseUpCallback = function (e) {
            this.beginGame()
        }.bind(this)
        
        this.overlay = this.game.add.graphics(0, 0)
        this.overlay.opacity = 0
        this.timer = this.game.time.create(false)
        this.timer.loop(Start.FADE_TIMEOUT, this.beginGame.bind(this))
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
        if(this.overlay.opacity >= 1)
            this.game.state.start('overworld')
        else this.overlay.opacity += 0.1
        
        this.timer.start()
    }
}
    
Start.FADE_TIMEOUT = 100