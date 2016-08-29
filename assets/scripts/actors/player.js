class Player extends Phaser.Sprite {
    constructor (game, city, saved) {
        super(game, city.x, city.y, 'city')
        this.game.add.existing(this)
        this.tint = 0x006600
        
        this.name = 'Dumb Name'
        this.city = city
        this.stats = {
            health: 50,
            carryingCapacity: 3
        }
        this.health = 48
        this.packages = []
        this.money = 500

		if ( typeof saved !== 'undefined' ) { //we need to load saved player attrs
			this.name = saved.name;
			this.stats = saved.stats;
			this.health = saved.health;
			this.packages = saved.packages;
			this.money = saved.money;
		}

    }
	dumps() {
		return {
			name: this.name,
            cityName: this.city.name,
			stats: this.stats,
			health: this.health,
			packages: this.packages,
			money: this.money
		};
	}
}
