class Road {
    constructor (game, co, cf) {
        this.game = game
        this.co = co
        this.cf = cf
        
        this.line = new Phaser.Line(co.x, co.y, cf.x, cf.y)
        this.length = this.getTravelDuration()
        
        this.treachery = this.generateTreachery()
    }
    
    generateTreachery() {
        var r = Math.random()
        
        r -= Road.GENTLE_CHANCE
        if(r <= 0) 
            return 1
            
        r -= Road.STANDARD_CHANCE
        if(r <= 0)
            return 2
            
        r -= Road.DIFFICULT_CHANCE
        if(r <= 0)
            return 3
            
        r -= Road.GRUELING_CHANCE
        if(r <= 0)
            return 4
            
        r -= Road.LETHAL_CHANCE
        if(r <= 0)
            return 5
            
        return 1
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
    
Road.GENTLE_CHANCE = .3
Road.STANDARD_CHANCE = .2
Road.DIFFICULT_CHANCE = .2
Road.GRUELING_CHANCE = .2
Road.LETHAL_CHANCE = .1
