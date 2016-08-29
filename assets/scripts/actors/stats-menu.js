class StatsMenu extends Phaser.Sprite {
    constructor (game, player) {
        
        // this is the grossest stuff that exists
        // please if there is a deity in the stars above
        // forgive me this transgression
        // i know it will be hard
        // but i'm begging you
        // it was just how it had to be
        
        super(game, 30, 60, 'stats-menu')
        this.game.add.existing(this)
        
        this.player = player
        this.fixedToCamera = true
        
        this.title = this.game.add.text(115, 90, 'Stats', { font: 'Inconsolata, monospace', fill: '#333333', stroke: '#333333', fontSize: '30px' })
        this.title.fixedToCamera = true
        
        this.horse = this.game.add.sprite(60, 120, 'horse', 0)
        this.horse.animations.add('running')
        this.horse.animations.play('running', 30, true)
        this.horse.fixedToCamera = true
        
        this.health = this.game.add.group()
        
        this.health.text = this.game.add.text(60, 280, 'Health', { font: 'Inconsolata, monospace', fill: '#333333', stroke: '#333333', fontSize: '30px' })
        this.health.text.fixedToCamera = true
        
        this.health.value = this.game.add.text(190, 280, this.player.health + '/' + this.player.stats.health, { font: 'Inconsolata, monospace', fill: '#333333', stroke: '#333333', fontSize: '30px' })
        this.health.value.fixedToCamera = true
        
        this.money = this.game.add.group ()
        
        this.money.text = this.game.add.text(60, 310, 'Money', { font: 'Inconsolata, monospace', fill: '#333333', stroke: '#333333', fontSize: '30px' })
        this.money.text.fixedToCamera = true
        
        this.money.value = this.game.add.text(190, 310, this.player.money, { font: 'Inconsolata, monospace', fill: '#333333', stroke: '#333333', fontSize: '30px' })
        this.money.value.fixedToCamera = true
        
        this.packages = this.game.add.group()
        
        this.packages.text = this.game.add.text(60, 340, 'Packages', { font: 'Inconsolata, monospace', fill: '#333333', stroke: '#333333', fontSize: '30px' })
        this.packages.text.fixedToCamera = true
        
        this.packages.value = this.game.add.text(190, 340, this.player.packages.length + '/' + this.player.stats.carryingCapacity, { font: 'Inconsolata, monospace', fill: '#333333', stroke: '#333333', fontSize: '30px' })
        this.packages.value.fixedToCamera = true
        
        for(var p = 0; p < 7 && p < this.player.packages.length; p++) {
            var pkg = this.player.packages[p]
            
            this.game.add.text(60, 400 + (20 * p), pkg.destination, { font: 'Inconsolata, monospace', fill: '#333333', stroke: '#333333', fontSize: '20px' }).fixedToCamera = true
            
            this.game.add.text(220, 400 + (20 * p), pkg.bounty, { font: 'Inconsolata, monospace', fill: '#333333', stroke: '#333333', fontSize: '20px' }).fixedToCamera = true
            
            if(p === 6) {
                this.game.add.text(60, 
                                   400 + (20 * p + 1), 
                                   '...and more', 
                                   { 
                                        font: 'Inconsolata, monospace', 
                                        fill: '#333333', 
                                        stroke: '#333333', 
                                        fontSize: '20px' 
                                    }
                                  ).fixedToCamera = true
            }
        }
            
        
        this.button = this.game.add.button(39, 572, 'button', function (e) {
            console.log(this.map.dumps())
            this.game.state.start('upgrade', true, false, this.player.dumps(), this.map.dumps())
        }, this.game.state.states.overworld)
        this.button.fixedToCamera = true
        this.button.text = this.game.add.text(100, 576, 'Upgrade', { font: 'Inconsolata, monospace', fill: '#e9bb8a', stroke: '#333333', fontSize: '30px' })
        this.button.text.fixedToCamera = true
    }
}