class Road {
    constructor (game, co, cf) {
        this.game = game
        this.co = co
        this.cf = cf
        
        this.line = new Phaser.Line(co.x, co.y, cf.x, cf.y)
    }
}