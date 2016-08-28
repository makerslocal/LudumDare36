class Travel {
    constructor (game) {
        this.game = game
    }
    
    preload () {
        
    }
    create () {
        
    }
    update () {
        
    }
    render () {
        
    }
	generateEvents(treachery, weeks) {
		if ( typeof weeks === 'undefined' ) {
			weeks = 1;
		}

		var res = Array();

		for ( var i=0; i<weeks; i++ ) {
			//bandits
			if ( Math.random() < 0.05 ) {
				res.push(new TravelEvent({
					health: this.player.stats.health * -0.1,
					money: this.player.money * 0.8
				}));
			}

			//snake bite
			if ( Math.random() < 0.05 ) {
				res.push(new TravelEvent({
					health: this.player.stats.health * -0.1;
				}));
			}

			//trip
			if ( Math.random() < 0.05 ) {
				res.push(new TravelEvent({ health: this.player.stats.health * -0.05 }));
			}

			//drop money
			if ( Math.random() < 0.05 ) {
				res.push(new TravelEvent({ money: this.player.money * 0.95 }));
			}

			//rock lobster
			if ( Math.random() < 0.01 ) {
				res.push(new TravelEvent({ health: this.player.stats.health * -0.02 }));
			}
		}
	
		return res;
			
	}
}
