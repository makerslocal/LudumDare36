class Road {
    constructor (game, co, cf) {
        this.game = game
        this.co = co
        this.cf = cf
        
        this.line = new Phaser.Line(co.x, co.y, cf.x, cf.y)
        this.length = this.getTravelDuration()
    }
    
    isConnectedTo(city) {
        return this.co === city || this.cf === city
    }
    getLength() {
		return Math.hypot(this.co.x - this.cf.x, this.co.y - this.cf.y); //lol
	}
    getTravelDuration() {
        return Math.ceil(this.getLength() / (100 + Math.floor(100 * Math.random())))
    }
}