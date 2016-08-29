class GameOver {
    constructor (game) {
        this.game = game
    }
    
    create () {
        this.game.stage.backgroundColor = '#282828'
        this.gameOverText = this.game.add.text(this.game.camera.width / 2 - this, 0, 'Game Over', { font: 'Amatic SC, serif', fill: '#ffffff', stroke: '#ffffff', fontSize: '120px', boundsAlignH: 'center', boundsAlignV: 'middle' })
        this.gameOverText.setTextBounds(0, 0, this.game.camera.width, this.game.camera.height)
        
        this.restartText = this.game.add.text(this.game.camera.width / 2 - this, 0, 'Click to restart', { font: 'Amatic SC, serif', fill: '#ffffff', stroke: '#ffffff', fontSize: '60px', boundsAlignH: 'center', boundsAlignV: 'middle' })
        this.restartText.setTextBounds(0, 100, this.game.camera.width, this.game.camera.height)
        
        this.game.input.keyboard.onUpCallback = function (e) {
            this.restartGame()
        }.bind(this)
		this.game.input.onTap.add(function() {
			this.restartGame()
		}, this);
        
        this.timer = this.game.time.create(false)
        this.timer.loop(GameOver.FADE_TIMEOUT, this.restartGame.bind(this))
        this.overlay = this.game.add.graphics(0, 0)
        this.overlay.opacity = 0
    }
    
    render () {
        this.overlay.clear()
        this.overlay.beginFill(0x000000, this.overlay.opacity)
        this.overlay.moveTo(0, 0)
        this.overlay.drawRect(0, 0, this.camera.width, this.camera.height)
        this.overlay.endFill()
    }
    
    restartGame () {
        if(this.overlay.opacity >= 1) {
            this.game.input.keyboard.onUpCallback = function () {}
            this.game.input.mouse.mouseUpCallback = function () {}
            
            localStorage.setItem('pex_player', null)
            localStorage.setItem('pex_map', null)
            
            // LITERALLY reload the entire page
            // like throw the whole damn thing in the trash
            window.location = window.location
        }
        else this.overlay.opacity += 0.1
        
        this.timer.start()
    }
}

GameOver.FADE_TIMEOUT = 100