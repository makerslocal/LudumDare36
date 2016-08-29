class City extends Phaser.Sprite {
    constructor(name,x,y,game) {
        
        super(game, 
              Math.floor(x * (game.world.width - game.camera.width) + game.camera.width / 2), 
              Math.floor(y * (game.world.height - game.camera.height) + game.camera.height / 2), 
              'city');
		this.originalX = x;
		this.originalY = y;
		
		this.game.add.existing(this);
        
        this.name = name;
        
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.events.onInputUp.add(function (e) {
            if(this instanceof City) this.game.state.states.overworld.clickedCity = this;
            this.game.state.states.overworld.current = this;
        }, this);

        this.nameText = this.game.add.text(0, 0,
                                           this.name,
                                           { font: 'Amatic SC, sans-serif',
                                             fill: '#211c05', stroke: '#FFB707',
                                             fontSize: '24px', fontWeight: 'bold',
                                             boundsAlignH: 'center',
                                             boundsAlignV: 'middle' })
        this.nameText.setTextBounds(this.x + this.width/2 - 100, this.y-30, 200, 50);
        this.nameText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
        this.alpha = 0.4
        this.nameText.alpha = 0
    }
}
