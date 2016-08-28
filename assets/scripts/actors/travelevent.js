class TravelEvent {
	constructor(defaults, text) {
		this.effects = {
			money: 0,
			health: 0
		};
		if ( typeof defaults === 'object' ) {
			if ( typeof defaults.money !== 'undefined' ) {
				this.effects.money = defaults.money;
			}
			if ( typeof defaults.health !== 'undefined' ) {
				this.effects.health = defaults.health;
			}
		}

		this.text = "An event happens for which the developers forgot to write a description.";
		if ( typeof text === 'string' ) {
			this.text = text;
		}

		if ( this.effects.money != 0 ) {
			this.text += " You lose " + this.effects.money + " gold as a result.";
		}
		if ( this.effects.health != 0 ) {
			this.text += " You are dealt " + health + " damage.";
		}
	}
}

