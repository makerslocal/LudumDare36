class Map extends graphlib.Graph {
    constructor (game) {
    
		super({ directed: false });
	
		this.rootNode = null;

		var prevNode = null;
	    for ( var i=0; i<Map.CITY_COUNT; i++ ) {

			name = Map.CITY_NAMES.pop();
		    var newNode = new City(name, Math.random(), Math.random(), game);
            this.setNode(name, newNode);
		    if ( this.rootNode == null ) {
			    //must be the first node we've ever created
			    console.log("ROOT NODE is " + newNode.name);
			    this.rootNode = newNode;
		    } 
        }

		this.generateCityFullMesh();
		console.log("EDGES: " + this.edges().length);
		this.removeIntersectingPaths();
		console.log("EDGES: " + this.edges().length);
		console.log(this.edges());

    }
    getCities() {
        return this._nodes;
    }
    getClosestCity(target, orphanOnly) {
		if ( typeof orphanOnly === undefined ) {
			orphanOnly = false;
		}

		var cities = this.getCities();
		var closest = cities[0];
        for ( var idx in cities ) {
			if ( getCityDistance(target,cities[idx]) < getCityDistance(target,closest) ) {
				if ( orphanOnly === false || this.nodeEdges(target.name) ) { //if we don't care whether it's an orphan, or if it is an orphan
					closest = cities[idx];
				}
			}
		}
		return closest;
	}
	generateCityFullMesh() {
		var cities = this.getCities();
		for ( var idx in cities ) {
			for ( var idx2 in cities ) {
				if ( idx != idx2 && !this.hasEdge(cities[idx].name,cities[idx2].name) ) {
					this.setEdge(cities[idx].name, cities[idx2].name, cities[idx].name + " - " + cities[idx2].name);
					console.log(this.edge(cities[idx].name,cities[idx2].name));
				}
			}
		}
	}
	removeIntersectingPaths() {
		var edges = this.edges();
		for ( var idx in edges ) {
			var v1 = edges[idx].v;
			var w1 = edges[idx].w;
			for ( var idx2 in edges ) {
				var v2 = edges[idx2].v;
				var w2 = edges[idx2].w;
				if ( idx != idx2 && this.hasEdge(v1,w1) && this.hasEdge(v2,w2) && this.doCityPathsIntersect(this.node(v1), this.node(w1), this.node(v2), this.node(w2)) ) {
					console.log("Remove conflicting edge " + v2 + "," + w2);
					this.removeEdge(v2,w2);
				}
			}
		}
	}	

	ccw(A,B,C) {
		return ((C.y-A.y) * (B.x-A.x)) > ((B.y-A.y) * (C.x-A.x));
	}
	doCityPathsIntersect(A,B,C,D) {
		if ( A==C || A==D || B==C || B==D ) {
			return false;
		}
		console.log("Check " + A.name + "," + B.name + " vs " + C.name + "," + D.name);
		return (this.ccw(A,C,D) != this.ccw(B,C,D)) && (this.ccw(A,B,C) != this.ccw(A,B,D));
	}

	getCityDistance(a,b) {
		return Math.hypot(a.x-b.x, a.y-b.y); //lol
	}
	
}

Map.CITY_COUNT = 10;
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


