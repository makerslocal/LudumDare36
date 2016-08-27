class Map extends graphlib.Graph {
    constructor () {
        super({ directed: false })
        for ( var i=0; i<Map.CITY_COUNT; i++ ) {
            name = Map.CITY_NAMES.pop();
            this.setNode(name, new City(name, Math.random(), Math.random()));
        }
        console.log("NODES GENERATED:");
        console.log(this.nodes());
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


