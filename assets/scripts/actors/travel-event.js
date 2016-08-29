class TravelEvent {
	constructor(defaults) {
		this.effects = {
			money: 0,
			health: 0
		};
		this.text = "An event happens for which the developers forgot to write a description.";
		
		if ( typeof defaults === 'object' ) {
			if ( typeof defaults.money !== 'undefined' ) {
				this.effects.money = Math.ceil(defaults.money);
			}
			if ( typeof defaults.health !== 'undefined' ) {
				this.effects.health = Math.ceil(defaults.health);
			}
			if ( typeof defaults.text === 'string' ) {
				this.text = defaults.text;
			}
		}


		if ( this.effects.money != 0 ) {
			this.text += " You " + (this.effects.money>0 ? "gain " + this.effects.money : "lose " + -(this.effects.money)) + " gold.";
		}

		if ( this.effects.health < 0 ) {
			this.text += " You are dealt " + -(this.effects.health) + " damage.";
		} else if ( this.effects.health > 0 ) {
			this.text += " You are healed by " + this.effects.health;
		}
	}
}

