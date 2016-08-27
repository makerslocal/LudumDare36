class Overworld {
    constructor (game) {
        this.game = game
        this.player = null
        this.cursor = null
        this.map = []
        this.inputs = {}
    }

    preload() {
        // load images, sounds
    }
    create() {
        this.game.stage.backgroundColor = "#5a3404";
        this.game.time.desiredFps = 30
        this.game.camera.follow(this.cursor)
        
        this.game.input.keyboard.addKeyCapture([37, 38, 39, 40, 32]) // prevent arrow keys, spacebar from scrolling
        this.inputs.keys = this.game.input.keyboard.createCursorKeys()
        
        for(var key in this.inputs.keys)
            this.inputs.keys[key].onUp.add(this.keyHandler, this)
        
        this.game.input.mouse.onMouseUp = this.mouseHandler.bind(this)
        this.game.input.touch.onTouchEnd = this.mouseHandler.bind(this)
    }
    update() {
        // logical update
        
        // three cities we're ever looking at:
        // current city -- city the player is at
        // selected city -- city the cursor is at
        // clicked city -- city that has been most recently clicked OR keyed to
        // clicked city is always the "newest", if it exists
        
        if(this.hasPlayerGivenValidInput()) {
            if(this.hasPlayerClickedADifferentCity()) 
                this.moveCursorToClickedCity()
            else if(this.hasPlayerClickedSelectedCity())
                if(this.isPlayerInSelectedCity()) {}
                else 
                    this.movePlayerToClickedCity()
            else if(this.hasPlayerClickedUpgradeButton())
                this.game.state.start('upgrade')
        
        
            this.inputs.current = null
        }
    }
    render() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32)
    }
    
    
    
    keyHandler(e) {
        console.log(e)
        this.inputs.current = e
    }
    mouseHandler(e) {
        console.log(e)
        this.inputs.current = e
    }
    hasPlayerGivenValidInput() {
        if(typeof this.inputs.current !== 'undefined' 
           && this.inputs.current !== null)
            if(this.inputs.current instanceof MouseEvent) 
                return this.isClickingCity()
            else if(this.inputs.current instanceof KeyboardEvent)
                return this.isKeyTowardsCity()
            
        return false
    }
    isClickingCity() {
        throw new Error('Unimplemented')
    }
    isKeyTowardsCity() {
        throw new Error('Unimplemented')
    }
    getClickedCity() {
        throw new Error('Unimplemented')
    }
    hasPlayerClickedADifferentCity() { 
        throw new Error('Unimplemented')
    }
    moveCursorToClickedCity() {
        this.cursor.city = this.getClickedCity()
    }
    hasPlayerClickedSelectedCity() {
        throw new Error('Unimplemented')
    }
    isPlayerInSelectedCity() {
        return this.player.city === this.cursor.city
    }
}