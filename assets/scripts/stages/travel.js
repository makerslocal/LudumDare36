class Travel {
    constructor (game) {
        this.game = game
    }
    
    init(player, road, map) {
        this.player = player
        this.events = this.generateEvents(road.treachery, road.length)
        this.map = map
    }
    
    preload () {
        this.game.load.image('t-sky', 'assets/sprites/travel-sky-1.png')
        this.game.load.image('t-bg', 'assets/sprites/travel-bg-1.png')
        this.game.load.image('t-info', 'assets/sprites/travel-info.png')
    }
    create () {
        
        this.sky = this.game.add.sprite(0, 0, 't-sky')
        this.sky.scale.setTo(4, 4)
        this.sky.smoothed = false
        
        this.background = this.game.add.sprite(0, 0, 't-bg')
        this.background.scale.setTo(4, 4)
        this.background.smoothed = false
        
        this.info = this.game.add.sprite(0, 0, 't-info')
        this.info.scale.setTo(4, 4)
        this.info.smoothed = false
        
        this.infoText = this.game.add.text(80, 480, 'You and your jockey leave town...', { font: 'Inconsolata, monospace', fill: '#5a3404', stroke: '#333333', fontSize: '30px', wordWrap: true, wordWrapWidth: 800 })
        
        this.horse = this.game.add.sprite(120, 280, 'horse', 0)
        this.horse.animations.add('running')
        this.horse.animations.play('running', 30, true)
        this.horse.scale.x *= -1
        
        this.interval = Math.floor(this.game.camera.width / (this.events.length + 1))
        this.intervalIndex = 1 // 1-indexed
        
        this.game.input.keyboard.onUpCallback = function (e) {
            if(this.horse.x < this.interval * this.intervalIndex) return
            
            if(e.keyCode === Phaser.Key.SPACEBAR)
                this.intervalIndex++
        }.bind(this)
        this.game.input.mouse.mouseUpCallback = function (e) {
            if(this.horse.x < this.interval * this.intervalIndex) return

            this.intervalIndex++
        }.bind(this)
    }
    update () {
        if(this.horse.x < this.interval * this.intervalIndex) {
            if(this.intervalIndex - 1 === this.events.length + 1) {
                this.game.state.start('overworld', true, false, this.map)
                return
            }
            this.horse.x += 4
            this.background.x -= 4
            this.sky.x -= 8
        }
        else {
            if(typeof this.events[this.intervalIndex - 1] !== 'undefined')
                this.infoText.text = this.events[this.intervalIndex - 1].text
            else if(this.intervalIndex - 1 === this.events.length)
                this.infoText.text = '...and the lonely road gives way to town.'
        }
    }
    render () {
        
    }
	generateEvents(treachery, weeks) {
		if ( typeof weeks === 'undefined' ) {
			weeks = 1;
		}

		var res = Array();

		for ( var i=0; i<weeks; i++ ) {
			//bandits
			if ( Math.random() < 0.05 ) {
				res.push(new TravelEvent({
					health: this.player.stats.health * -0.1,
					money: this.player.money * 0.8
				}));
			}

			//snake bite
			if ( Math.random() < 0.20 ) {
				res.push(new TravelEvent({
					health: this.player.stats.health * -0.1
				}));
			}

			//trip
			if ( Math.random() < 0.20 ) {
				res.push(new TravelEvent({ health: this.player.stats.health * -0.05 }));
			}

			//drop money
			if ( Math.random() < 0.10 ) {
				res.push(new TravelEvent({ money: this.player.money * 0.95 }));
			}

			//rock lobster
			if ( Math.random() < 0.01 ) {
				res.push(new TravelEvent({ health: this.player.stats.health * -0.02 }));
			}
		}
	
		return res;
			
	}
}
