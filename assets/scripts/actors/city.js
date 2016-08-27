class City {
	constructor(name,x,y,game) {
		this.name = name;
		this.x = x;
		this.y = y;
        
        this.sprite = game.add.sprite(
            Math.floor(this.x * game.world.width), 
            Math.floor(this.y * game.world.height),
            'city'
        );
        this.sprite.name = this.name
        this.sprite.inputEnabled = true;
        this.sprite.input.useHandCursor = true;
        this.sprite.events.onInputUp.add(function (e) {
            e.game.state.clickedCity = e;
            e.game.state.current = e
            console.log(e);
        }, this);
	}
}