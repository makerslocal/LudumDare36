class Player extends Phaser.Sprite {
    constructor (game, city) {
        super(game, city.x, city.y, 'city')
        this.game.add.existing(this)
        this.tint = 0x006600
        
        this.name = 'Dumb Name'
        this.city = city
        this.stats = {
            health: 50,
            carryingCapacity: 20
        }
        this.health = 48
        this.letters = 3
        this.money = 500
    }
}