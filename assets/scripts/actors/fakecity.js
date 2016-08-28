class FakeCity {
    constructor(name,x,y,game) {
        
        this.x = Math.floor(x * (game.world.width - game.camera.width) + game.camera.width / 2);
	this.y = Math.floor(y * (game.world.height - game.camera.height) + game.camera.height / 2);
        this.name = name;
        
    }
}
