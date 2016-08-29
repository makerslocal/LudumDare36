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

    init(mapDump, playerDump) {
        this.mapDump = mapDump
        this.playerDump = playerDump
    }
    preload() {
        // load images, sounds
        this.game.load.image('city', 'assets/sprites/city.png')
        this.game.load.image('stats-menu', 'assets/sprites/stats-menu.png')
        this.game.load.image('button', 'assets/sprites/stats-menu-button.png')
        this.game.load.spritesheet('horse', 'assets/sprites/horse.png', 183, 134)
    }
	storageAvailable() {
		try {
			var storage = window.localStorage, x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		} catch(e) {
			return false;
		}
	}
    create() {
        this.game.stage.backgroundColor = '#D5B783'
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
        
        if(typeof this.mapDump !== 'undefined' && this.mapDump !== null)
            this.map = new Map(this.game, this.mapDump)
        if(typeof this.playerDump !== 'undefined' && this.playerDump !== null) {
            var cities = this.map.getCities(),
                playerCity = null
            for(var c in cities)
                if(cities[c].name === this.playerDump.cityName)
                    playerCity = cities[c]
            this.player = new Player(this.game, playerCity, this.playerDump)
        }
            
        if(this.map === null) {
			var loadedMap = false;
			var savedMap = null;
			if ( this.storageAvailable() ) {
				savedMap = JSON.parse(localStorage.getItem('pex_map'));
				if ( savedMap != null ) {
					loadedMap = true;
					console.log("Map loaded from localStorage");
				}
			}

			if ( loadedMap ) {
				this.map = new Map(this.game, savedMap);
			} else {
				this.map = new Map(this.game);
			}
		}
            
        
        var loadedPlayer = false;
		var savedPlayer = null;
		if ( this.player === null ) {
			if ( this.storageAvailable() ) {
				savedPlayer = JSON.parse(localStorage.getItem('pex_player'));
				if ( savedPlayer != null ) {
					loadedPlayer = true;
					console.log("Player loaded from localStorage");
				}
			}
			if ( loadedPlayer ) {
				this.player = new Player(this.game, this.map.rootNode, savedPlayer);
			} else {
				this.player = new Player(this.game, this.map.rootNode);
			}
		}

        this.cursor = this.player.city
        this.adjacentCities = this.map.getConnectedCities(this.cursor)
        
        this.player.city.alpha = 1
        this.player.city.nameText.alpha = 1 
        
        for(var c in this.adjacentCities){
            this.adjacentCities[c].alpha = 1
            this.adjacentCities[c].nameText.alpha = 1
        }
            
        this.game.camera.setPosition(this.player.x - this.game.camera.width / 2, this.player.y - this.game.camera.height / 2)
        
        this.graphics = this.game.add.graphics(0, 0)
        this.roads = this.createRoads(this.map.getRoads())
        
        this.statsMenu = new StatsMenu(this.game, this.player)

		//Save to disk
		if ( this.storageAvailable() ) {
			localStorage.setItem('pex_player', JSON.stringify(this.player.dumps()));
			localStorage.setItem('pex_map', JSON.stringify(this.map.dumps()));
			console.log("Game saved to localStorage");
		} else {
			console.log("Not saving to localStorage as it's not available");
		}

    }
    update() {
        // logical update
        
        // three cities we're ever looking at:
        // current city -- city the player is at
        // selected city -- city the cursor is at
        // clicked city -- city that has been most recently clicked OR keyed to
        // clicked city is always the "newest", if it exists
        
        if(this.hasPlayerGivenValidInput() && this.getClickedCity() !== null) {
            if(this.hasPlayerClickedADifferentCity())
                this.moveCursorToClickedCity()
            else if(this.hasPlayerClickedSelectedCity())
                if(this.isPlayerInSelectedCity()) {}
                else 
                    this.movePlayerToClickedCity()
            else if(this.isPlayerInClickedCity()) {
                if(typeof this.selectedRoad !== 'undefined' && this.selectedRoad !== null) {
                    this.graphics.beginFill()
                    this.graphics.lineStyle(3, 0x82653C, 1)
                    this.graphics.moveTo(this.selectedRoad.co.x + 32, this.selectedRoad.co.y + 24)
                    this.graphics.lineTo(this.selectedRoad.cf.x + 32, this.selectedRoad.cf.y + 24)
                    this.graphics.endFill()
                }
                this.selectedRoad = null
                if(this.cursor !== null) this.cursor.tint = 0xffffff
                this.cursor = this.player.city
                this.game.add.tween(this.game.camera).to(
                    { 
                        x: this.cursor.x - (this.game.camera.width / 2), 
                        y: this.cursor.y - (this.game.camera.height / 2), 
                    },
                    300, 
                    Phaser.Easing.Quadratic.InOut, 
                    true
                )
            }
            this.clickedCity = null
        }
        
        // thanks to @sanojian from http://www.html5gamedevs.com/topic/9814-move-camera-by-dragging-the-world-floor/
        if (this.game.input.activePointer.isDown) {	
            if (this.game.origDragPoint) {		
                // move the camera by the amount the mouse has moved since last update		
                this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;		
                this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;	
            }	
            // set new drag origin to current position	
            this.game.origDragPoint = this.game.input.activePointer.position.clone();
        }
        else {	
            this.game.origDragPoint = null;
        }
    }
    render() {

    }
    
    
    
    createRoads (roads) {
        var rs = []
        for(var r in roads) {
            var road = new Road(this.game, roads[r].v, roads[r].w)
            rs.push(road)
        }
            
        this.graphics.clear()
        this.graphics.beginFill('#4bd49c')
        for(var r in rs) {
            var road = rs[r]
            if(road.isConnectedTo(this.player.city))
                this.graphics.lineStyle(3, 0x82653C, 1) //darker color
            else this.graphics.lineStyle(3, 0xBB955F, 1) //lighter color
            this.graphics.moveTo(road.co.x + 32, road.co.y + 24)
            this.graphics.lineTo(road.cf.x + 32, road.cf.y + 24)
            
            if(road.isConnectedTo(this.player.city)) {
                                
                var treacheryRating = ''
                
                for(var i = 1; i <= 5; i++)
                    if(i <= road.treachery)
                        treacheryRating += '\u2605'
                    else treacheryRating += '\u2606'
                
                //road.treacheryText = this.game.add.text(road.line.midPoint().x + (treacheryRating.length * 11) / 2, road.line.midPoint().y + 30, treacheryRating, { font: 'monospace', fill: '#615C45', stroke: '#615C45', fontSize: '22px' });
				//road.treacheryText.rotation = road.text.rotation;
				
				road.text = this.game.add.text(
						road.line.midPoint().x,
						road.line.midPoint().y,
						road.length + ' ' + (road.length>1 ? 'weeks' : 'week') + ' ' + treacheryRating,
						{ font: 'Amatic SC, serif', fill: '#615C45', stroke: '#615C45', fontSize: '18px', fontWeight: 'bold' }
					);
				var angle = this.map.getCityAngle(road.co, road.cf);
				if ( angle > Math.PI*0.5 && angle < Math.PI*1.5 ) {
					angle -= Math.PI;
				}
				//road.text.rotation = angle;

            }
                
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
        for(var c in this.adjacentCities) {
            var city = this.adjacentCities[c]
            
            switch(this.current.keyCode) {
                default:
                    console.log(this.current.keyCode)
            }
        }
        throw new Error('Unimplemented')
    }
    getClickedCity() {
        return this.clickedCity
    }
    hasPlayerClickedADifferentCity() { 
        if(this.cursor === null) return true
        return this.cursor.name !== this.getClickedCity().name && this.player.city.name !== this.getClickedCity().name
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
        if(typeof this.selectedRoad !== 'undefined' && this.selectedRoad !== null) {
            this.graphics.beginFill()
            this.graphics.lineStyle(3, 0x82653C, 1)
            this.graphics.moveTo(this.selectedRoad.co.x + 32, this.selectedRoad.co.y + 24)
            this.graphics.lineTo(this.selectedRoad.cf.x + 32, this.selectedRoad.cf.y + 24)
            this.graphics.endFill()
        }
        
        if(this.adjacentCities.indexOf(this.cursor) !== -1) {
            
            for(var r in this.roads)
                if(this.roads[r].isConnectedTo(this.cursor) && this.roads[r].isConnectedTo(this.player.city))
                    this.selectedRoad = this.roads[r]
            
            if(typeof this.selectedRoad !== 'undefined') {
                this.graphics.beginFill()
                this.graphics.lineStyle(3, 0x000000, 1)
                this.graphics.moveTo(this.selectedRoad.co.x + 32, this.selectedRoad.co.y + 24)
                this.graphics.lineTo(this.selectedRoad.cf.x + 32, this.selectedRoad.cf.y + 24)
                this.graphics.endFill()
            }
        }
            
    }
    
    hasPlayerClickedSelectedCity() {
        return this.getClickedCity().name === this.cursor.name
    }
    isPlayerInSelectedCity() {
        return this.player.city.name === this.cursor.name
    }
    isPlayerInClickedCity() {
        if(this.getClickedCity() === null) return false
        return this.player.city.name === this.getClickedCity().name
    }
    movePlayerToClickedCity() {
        
        if(this.adjacentCities.indexOf(this.getClickedCity()) === -1)
           return
        
        this.game.input.keyboard.onUpCallback = function () {}
        this.game.input.mouse.mouseUpCallback = function () {}
        this.player.city = this.getClickedCity()
        this.game.state.start('travel', true, false, this.player.dumps(), this.selectedRoad, this.map.dumps())
    }
}
