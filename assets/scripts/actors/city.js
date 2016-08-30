class City extends Phaser.Sprite {
    constructor(name,x,y,game,packages,map) {
        
        super(game, 
              Math.floor(x * (game.world.width - game.camera.width) + game.camera.width / 2), 
              Math.floor(y * (game.world.height - game.camera.height) + game.camera.height / 2), 
              'city');
		this.originalX = x;
		this.originalY = y;
		
		this.game.add.existing(this);
        
        this.name = name;

		if ( packages === null ) { //generate packages
			this.packages = Array();
			var asdf = Math.random();
			var nodes = knuthShuffle(map.nodes().slice(0));
			if ( nodes.length>0 && asdf < 0.25 ) {
				this.packages.push(new Package(nodes.pop(), Math.floor(Math.random()*400) + 100));
			}
			if ( nodes.length>0 && asdf < 0.75 ) {
				this.packages.push(new Package(nodes.pop(), Math.floor(Math.random()*250) + 50));
			}
			if ( nodes.length>0 ) {
				this.packages.push(new Package(nodes.pop(), Math.floor(Math.random()*70) + 30));
			}
		} else {
			this.packages = packages;
		}
        
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.events.onInputUp.add(function (e) {
            if(this instanceof City) this.game.state.states.overworld.clickedCity = this;
            this.game.state.states.overworld.current = this;
        }, this);

        this.nameText = this.game.add.text(0, 0,
                                           this.name + '   \uD83D\uDCE6 ' + this.packages.length,
                                           { font: 'Amatic SC, sans-serif',
                                             fill: '#211c05', stroke: '#FFB707',
                                             fontSize: '30px', fontWeight: 'bold',
                                             boundsAlignH: 'center',
                                             boundsAlignV: 'middle' })
        
        this.nameText.setTextBounds(this.x + this.width/2 - 100, this.y-30, 200, 50);
        this.nameText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        
        this.alpha = 0.4
        this.nameText.alpha = 0.4
    }
}
