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
		"Cherokee County",
		"Bluff City",
		"Bluffton",
		"Cherokee County",
		"Boston",
		"Brownville",
		"Tuscaloosa County",
		"Cahaba",
		"Cedric",
		"Centerdale",
		"Chandler Springs",
		"Choctaw Corner",
		"Chulafinnee Placers",
		"Claiborne",
		"Clarkesville",
		"Dumphries",
		"Erie",
		"Failetown",
		"Finchburg",
		"Fort Gaines",
		"Fort McClellan",
		"Fort Morgan",
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
		"Washington"
		]);

var worldmap = new graphlib.Graph({ directed: false });

for ( var i=0; i<cityCount; i++ ) {
	name = names.pop();
	worldmap.setNode(name, new City(name, Math.random(), Math.random()));
}

console.log("NODES GENERATED:");
console.log(worldmap.nodes());


