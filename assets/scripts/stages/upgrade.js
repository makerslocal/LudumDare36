class Upgrade {
    constructor (game) {
        this.game = game
    }
    
    init (player, map) {
        this.player = player
        this.map = map
    }
    preload () {
        this.game.load.image('upgrade-bg', 'assets/sprites/upgrade.png')
        this.game.load.image('upgrade-bag', 'assets/sprites/upgrade-icon-bag.png')
        this.game.load.image('upgrade-hat', 'assets/sprites/upgrade-icon-hat.png')
        this.game.load.image('upgrade-jockey', 'assets/sprites/upgrade-icon-jockey.png')
        this.game.load.image('upgrade-saddle', 'assets/sprites/upgrade-icon-saddle.png')
        this.game.load.image('upgrade-shoe', 'assets/sprites/upgrade-icon-shoe.png')
        this.game.load.image('exit-sign', 'assets/sprites/travel-info.png')
        this.game.load.spritesheet('horse', 'assets/sprites/horse.png', 183, 134)
        this.game.load.spritesheet('jockey', 'assets/sprites/jockey.png', 183, 134)
    }
    create () {
        this.bg = this.game.add.sprite(0, 0, 'upgrade-bg')
        this.bg.scale.setTo(4, 4)
        this.bg.smoothed = false
        
        this.horse = this.game.add.sprite(240, 240, 'horse')
        this.horse.scale.setTo(3, 3)
        this.horse.smoothed = false
        this.horse.animations.add('running')
        this.horse.animations.play('running', 20, true)
        
//        this.jockeySprite = this.game.add.sprite(240, 240, 'jockey')
//        this.jockeySprite.scale.setTo(3, 3)
//        this.jockeySprite.smoothed = false
//        this.jockeySprite.animations.add('running')
//        this.jockeySprite.animations.play('running', 20, true)
        
        this.bag = this.game.add.sprite(160, 180, 'upgrade-bag')
        this.bag.scale.setTo(4, 4)
        this.bag.smoothed = false
        
        this.bag.inputEnabled = true
        this.bag.input.useHandCursor = true
        this.bag.events.onInputUp.add(function (e) {
            if(this.player.money >= 300) {
                this.player.money -= 300
                this.player.stats.carryingCapacity += 1
                this.availableCash.text = 'You have ' + this.player.money + ' \uD83D\uDCB0'
            }
        }, this)
        
        this.game.add.text(165, 155, '\uD83D\uDCB0 300', 
            { 
                font: 'Helvetica Neue, sans-serif',
                fill: '#78410C', stroke: '#78410C',
                fontSize: '20px', fontWeight: 'bold',
                boundsAlignH: 'center',
                boundsAlignV: 'middle' 
            })
        this.game.add.text(165, 260, '+1 \uD83D\uDCE6',
            { 
                font: 'Helvetica Neue, sans-serif',
                fill: '#78410C', stroke: '#78410C',
                fontSize: '20px', fontWeight: 'bold',
                boundsAlignH: 'center',
                boundsAlignV: 'middle' 
            })
        
        this.saddle = this.game.add.sprite(160, 380, 'upgrade-saddle')
        this.saddle.scale.setTo(4, 4)
        this.saddle.smoothed = false
        
        this.saddle.inputEnabled = true
        this.saddle.input.useHandCursor = true
        this.saddle.events.onInputUp.add(function (e) {
            console.log(this.player)
            if(this.player.money >= 500) {
                this.player.money -= 500
                this.player.stats.health += 10
                this.player.health += 10
                this.availableCash.text = 'You have ' + this.player.money + ' \uD83D\uDCB0'
            }
            console.log(this.player)
        }, this)
                
        this.game.add.text(165, 355, '\uD83D\uDCB0 500', 
            { 
                font: 'Helvetica Neue, sans-serif',
                fill: '#78410C', stroke: '#78410C',
                fontSize: '20px', fontWeight: 'bold',
                boundsAlignH: 'center',
                boundsAlignV: 'middle' 
            })  
        this.game.add.text(165, 460, '+10 HP', 
            { 
                font: 'Helvetica Neue, sans-serif',
                fill: '#78410C', stroke: '#78410C',
                fontSize: '20px', fontWeight: 'bold',
                boundsAlignH: 'center',
                boundsAlignV: 'middle' 
            })
        
        this.hat = this.game.add.sprite(760, 180, 'upgrade-hat')
        this.hat.scale.setTo(4, 4)
        this.hat.smoothed = false
        this.hat.tint = 0x555555
        
        this.jockey = this.game.add.sprite(760, 280, 'upgrade-jockey')
        this.jockey.scale.setTo(4, 4)
        this.jockey.smoothed = false
        this.jockey.tint = 0x555555
        
        this.shoe = this.game.add.sprite(760, 380, 'upgrade-shoe')
        this.shoe.scale.setTo(4, 4)
        this.shoe.smoothed = false
        this.shoe.tint = 0x555555
        
        this.sign = this.game.add.sprite(620, 360, 'exit-sign')
        this.sign.scale.setTo(1.5, 1.5)
        this.sign.smoothed = false
        this.sign.text = this.game.add.text(
            740, 
            533, 
            'Back to map   >', 
            { 
                font: 'Amatic SC, sans-serif',
                fill: '#78410C', stroke: '#78410C',
                fontSize: '40px', fontWeight: 'bold',
                boundsAlignH: 'center',
                boundsAlignV: 'middle' 
            }
        )
        this.sign.inputEnabled = true
        this.sign.input.useHandCursor = true
        this.sign.events.onInputUp.add(function (e) {
            this.game.state.start('overworld', true, false, this.map, this.player)
        }, this)
        
        this.availableCash = this.game.add.text(450, 200, 'You have ' + this.player.money + ' \uD83D\uDCB0', 
            { 
                font: 'Helvetica Neue, sans-serif',
                fill: '#78410C', stroke: '#78410C',
                fontSize: '20px', fontWeight: 'bold',
                boundsAlignH: 'center',
                boundsAlignV: 'middle' 
            })
    }
    update () {
        
    }
    render () {
        
    }
}
