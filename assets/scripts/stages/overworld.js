class Overworld {
    constructor (game) {
        this.game = game
        this.player = null
        this.cursor = null
        this.map = null
        this.inputs = {}
        this.current = null
        this.statsMenu = null
    }

    preload() {
        // load images, sounds
        this.game.load.image('city', 'assets/sprites/city.png')
        this.game.load.image('stats-menu', 'assets/sprites/stats-menu.png')
        this.game.load.image('button', 'assets/sprites/stats-menu-button.png')
        this.game.load.spritesheet('horse', 'assets/sprites/horse.png', 183, 134)
    }
    create() {
        this.game.stage.backgroundColor = '#5a3404'
        this.game.time.desiredFps = 30
        this.game.world.setBounds(0, 0, 2 * this.game.camera.width, 2* this.game.camera.height)
        this.game.camera.setPosition(
            this.game.world.centerX - this.game.camera.width / 2, 
            this.game.world.centerY - this.game.camera.height / 2
        )
        
        this.game.input.keyboard.addKeyCapture([37, 38, 39, 40, 32]) // prevent arrow keys, spacebar from scrolling
        this.inputs.keys = this.game.input.keyboard.createCursorKeys()
        
        for(var key in this.inputs.keys)
            this.inputs.keys[key].onUp.add(this.keyHandler, this)
        
        this.map = new Map(this.game)
        this.player = new Player(this.game, this.map.rootNode)
        this.game.camera.setPosition(this.player.x - this.game.camera.width / 2, this.player.y - this.game.camera.height / 2)
        
        this.graphics = this.game.add.graphics(0, 0)
        this.roads = this.createRoads(this.map.getRoads())
        
        
        this.statsMenu = new StatsMenu(this.game, this.player)
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
        
        
            this.current = null
        }
    }
    render() {
        
    }
    
    
    createRoads (roads) {
        var rs = []
        for(var r in roads) {
            var road = new Road(this.game, roads[r].v, roads[r].w)
            if(road.isConnectedTo(this.player.city)) rs.push(road)
        }
            
        this.graphics.clear()
        this.graphics.beginFill('#4bd49c')
        for(var r in rs) {
            var road = rs[r]
            this.graphics.lineStyle(3, 0x4bd49c, 1)
            this.graphics.moveTo(road.co.x + 32, road.co.y + 24)
            this.graphics.lineTo(road.cf.x + 32, road.cf.y + 24)
        }
        this.graphics.endFill()
        
        return rs
    }
    keyHandler(e) {
        this.current = e
    }
    hasPlayerGivenValidInput() {
        try {
            if(typeof this.current !== 'undefined' 
               && this.current !== null) {
                if(this.current instanceof Phaser.Sprite && this.current.key === 'city') 
                    // TODO: check for city adjacency
                    return true 
                else if(this.current instanceof Phaser.Key)
                    return this.isKeyTowardsCity()
            }
        }
        catch(e) {
            if(this.current !== null)
                console.log(e)
            this.current = null
        }
        return false
    }
    isClickingCity() {
        throw new Error('Unimplemented')
    }
    isKeyTowardsCity() {
        throw new Error('Unimplemented')
    }
    getClickedCity() {
        return this.clickedCity
    }
    setClickedCity() {
        throw new Error('Unimplemented')
    }
    hasPlayerClickedADifferentCity() { 
        if(this.cursor === null) return true
        return this.cursor.city !== this.getClickedCity()
    }
    moveCursorToClickedCity() {
        if(this.cursor !== null) this.cursor.tint = 0xffffff
        this.cursor = this.getClickedCity()
        this.game.add.tween(this.game.camera).to(
            { 
                x: this.cursor.x - (this.game.camera.width / 2), 
                y: this.cursor.y - (this.game.camera.height / 2), 
            },
            300, 
            Phaser.Easing.Quadratic.InOut, 
            true
        )
        this.cursor.tint = 0x000000
    }
    hasPlayerClickedSelectedCity() {
        throw new Error('Unimplemented')
    }
    isPlayerInSelectedCity() {
        return this.player.city === this.cursor.city
    }
}