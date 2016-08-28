class City extends Phaser.Sprite {
    constructor(name,x,y,game) {
        
        super(game, 
              Math.floor(x * (game.world.width - game.camera.width) + game.camera.width / 2), 
              Math.floor(y * (game.world.height - game.camera.height) + game.camera.height / 2), 
              'city');
        this.game.add.existing(this);
        
        this.name = name;
        
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.events.onInputUp.add(function (e) {
            this.game.state.states.overworld.clickedCity = this;
            this.game.state.states.overworld.current = this;
        }, this);
        
        this.nameText = this.game.add.text(this.x + (this.width / 2) - (11 * this.name.length) / 2, this.y + 35, this.name, { font: 'Inconsolata, monospace', fill: '#4bd49c', stroke: '#4bd49c', fontSize: '22px' })
        
        this.alpha = 0.4
        this.nameText.alpha = 0
    }
}
