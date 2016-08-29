class Player extends Phaser.Sprite {
    constructor (game, city, saved) {
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

		if ( typeof saved !== 'undefined' ) { //we need to load saved player attrs
			this.name = saved.name;
			this.stats = saved.stats;
			this.health = saved.health;
			this.letters = saved.letters;
			this.money = saved.letters;
		}

    }
	dumps() {
		return {
			name: this.name,
			stats: this.stats,
			health: this.health,
			letters: this.letters,
			money: this.money
		};
	}
}
