class Map extends graphlib.Graph {
    constructor (game) {
        super({ directed: false });
	
	this.rootNode = null;

	var prevNode = null;
        for ( var i=0; i<Map.CITY_COUNT; i++ ) {
        	name = Map.CITY_NAMES.pop();
		    var newNode = new City(name, Math.random(), Math.random(), game);
            this.setNode(name, newNode);
		    if ( prevNode != null ) {
			    console.log("Linking " + newNode.name + " to " + prevNode.name + " - " + this.getCityDistance(newNode,prevNode) + " away");
			    this.setEdge(newNode.name,prevNode.name);
		    } else {
			    //must be the first node we've ever created
			    console.log("ROOT NODE is " + newNode.name);
			    this.rootNode = newNode;
		    }
		    prevNode = newNode;
        }
    }
    getCities() {
		console.log("Call to getCities() - plz don't do this");
        return this._nodes;
    }
    getClosestCity(target) {
		var closest = null;
        //for ( var idx in this.nodeEdges )
	}
	getCityDistance(a,b) {
		return Math.hypot(a.x-b.x, a.y-b.y); //lol
	}
	
}

Map.CITY_COUNT = 10
Map.CITY_NAMES = knuthShuffle([
		"Arcola",
		"Bainbridge",
		"Barnesville",
		"Battelle",
		"Beaver Mills",
		"Bellefonte",
		"Blakeley",
		"Blanche",
		"Bluff City",
		"Bluffton",
		"Boston",
		"Brownville",
		"Cahaba",
		"Cedric",
		"Centerdale",
		"Chandler Springs",
		"Choctaw Corner",
		"Claiborne",
		"Clarkesville",
		"Dumphries",
		"Erie",
		"Failetown",
		"Finchburg",
		"Gantts Quarry",
		"Gold Log Mine",
		"Houston",
		"Kaulton",
		"Louina",
		"Manasco",
		"Massillon",
		"Minden",
		"Montezuma",
		"Morgan Stream",
		"Mountain Mills",
		"Nottingham",
		"Odena",
		"Old Ramer",
		"Pansey",
		"Pikeville",
		"Prairie Bluff",
		"Riverton",
		"Rockcastle",
		"St. Stephens",
		"Stanton",
		"Tooktocaugee",
		"Turkey Town",
		"Valhermoso Springs",
		"Vienna",
		"Waldo",
		])


