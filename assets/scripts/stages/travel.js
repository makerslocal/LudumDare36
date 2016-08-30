class Travel {
    constructor (game) {
        this.game = game
    }
    
    init(player, road, map) {
        
		this.player = player
        this.map = map
		
		console.log("cf=" + road.cf.name + ",co=" + road.co.name + ",player.cityName=" + player.cityName);
		if ( road.cf.name == player.cityName ) {
			this.comingFrom = road.co;
			this.goingTo = road.cf;
		} else {
			this.comingFrom = road.cf;
			this.goingTo = road.co;
		}

		/*
		//pick up packages
		while ( this.comingFrom.packages.length > 0 && player.packages.length < player.stats.carryingCapacity ) {
			this.player.packages.push(this.comingFrom.packages.pop());
		}
		*/

		//deliver packages
		this.events = this.generateEvents(road.treachery, road.length)
		var newpackages = Array();
		for ( var idx in player.packages ) {
			if ( player.packages[idx].destination == this.goingTo.name ) {
				this.events.push(new TravelEvent({
					text: "You deliver a package to its destination, just outside of " + this.goingTo.name + ".",
					money: player.packages[idx].bounty
				}));
                
                if(player.packages.length === 0 && map.packageCount === 0) {
                    this.game.state.start('win')
                }
			} else {
				newpackages.push(player.packages[idx]);
			}
		}
		player.packages = newpackages;

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
        
        this.infoText = this.game.add.text(
				80, 
				480, 
				'You and your jockey depart from ' + this.comingFrom.name + '.', 
				{ font: 'Inconsolata, monospace', fill: '#5a3404', stroke: '#333333', fontSize: '30px', wordWrap: true, wordWrapWidth: 800 }
		);
        
        this.horse = this.game.add.sprite(120, 160, 'horse', 0)
        this.horse.animations.add('running')
        this.horse.animations.play('running', 30, true)
        this.horse.scale.x *= -1
        this.horse.scale.setTo(-2, 2)
        
        this.interval = Math.floor(this.game.camera.width / (this.events.length + 1))
        this.intervalIndex = 1 // 1-indexed
        
        this.game.input.keyboard.onUpCallback = function (e) {
            if(this.horse.x < this.interval * this.intervalIndex) return
            
            if(e.keyCode === Phaser.Key.SPACEBAR) {
                this.intervalIndex++
                this.horse.animations.play('running', 30, true)
            }
        }.bind(this)
        this.game.input.onTap.add(function (e) {
            if(this.horse.x < this.interval * this.intervalIndex) return

            this.horse.animations.play('running', 30, true);
			this.infoText.text = '';
            this.intervalIndex++
        }, this);
        
        this.timer = this.game.time.create(false)
        this.timer.loop(Start.FADE_TIMEOUT, this.goToOverworld.bind(this))
                
        this.overlay = this.game.add.graphics(0, 0)
        this.overlay.opacity = 0
    }
    update () {
        if(this.horse.x < this.interval * this.intervalIndex) {
            if(this.intervalIndex - 1 === this.events.length + 1) {
                if(this.overlay.opacity === 0)
                    this.goToOverworld()
                else return
            }
            this.horse.x += 4
            this.background.x -= 8
            this.sky.x -= 4
        }
        else {
            if(this.horse.animations.getAnimation('running').isPlaying) {
                if(typeof this.events[this.intervalIndex - 1] !== 'undefined') {
                    var event = this.events[this.intervalIndex - 1]
                    this.infoText.text = event.text

                    if(typeof event.effects.health !== 'undefined')
                        this.player.health += event.effects.health
                    if(typeof event.effects.money !== 'undefined')
                        this.player.money += event.effects.money

                    if(this.player.health <= 0)
                        this.game.state.start('game-over')
                }
                else if(this.intervalIndex - 1 === this.events.length)
                    this.infoText.text = 'You stop in ' + this.goingTo.name  + ' to rest and restock on supplies.'

                this.horse.animations.stop()
            }
        }
    }
    render () {
        this.overlay.clear()
        this.overlay.beginFill(0x000000, this.overlay.opacity)
        this.overlay.moveTo(0, 0)
        this.overlay.drawRect(0, 0, this.camera.width, this.camera.height)
        this.overlay.endFill()
    }
	generateEvents(treachery, weeks) {
		if ( typeof weeks === 'undefined' ) {
			weeks = 1;
		}

		var res = Array();

		for ( var i=0; i<weeks; i++ ) {
			//bandits
			if ( Math.random() < 0.01*treachery ) {
				res.push(new TravelEvent({
					text: "\"Stick 'em up! This is a stick up!\"\n",
					health: (this.player.stats.health * -0.1)-1,
					money: (this.player.money * -0.81)-1
				}));
			}

			//snake bite
			if ( Math.random() < 0.02*treachery ) {
				res.push(new TravelEvent({
					text: "You were bitten by a snake!",
					health: (this.player.stats.health * -0.1)-1
				}));
			}

			//trip
			if ( Math.random() < 0.04*treachery ) {
				res.push(new TravelEvent({
					text: "You tripped due to your jockey's negligence.",
					health: (this.player.stats.health * -0.05)-1
				}));
			}

			//drop money
			if ( Math.random() < 0.02 ) {
				res.push(new TravelEvent({
					text: "Your jockey clumsily dropped some money on the ground.",
					money: (this.player.money * -0.05)-1
				}));
			}

			//rock lobster
			if ( Math.random() < 0.01*treachery ) {
				res.push(new TravelEvent({
					text: "You ran into a rock... but it wasn't a rock!",
					health: (this.player.stats.health * -0.02)-1
				}));
			}
		}
	
		return res;
			
	}
    
    goToOverworld () {
        
        this.horse.animations.stop()
        
        if(this.overlay.opacity >= 1) {
            this.game.input.keyboard.onUpCallback = function () {}
            this.game.input.mouse.mouseUpCallback = function () {}
            this.game.state.start('overworld', true, false, this.map, this.player)
        }
        else this.overlay.opacity += 0.1
        
        this.timer.start()
    }
}
