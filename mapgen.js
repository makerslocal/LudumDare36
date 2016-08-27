//"use strict";

var cityCount = 10;

names = knuthShuffle([
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
		]);

var worldmap = new graphlib.Graph({ directed: false });

for ( var i=0; i<cityCount; i++ ) {
	name = names.pop();
	worldmap.setNode(name, new City(name, Math.random(), Math.random()));
}

console.log("NODES GENERATED:");
console.log(worldmap.nodes());


