class Map extends graphlib.Graph {
    constructor (game) {
    
		super({ directed: false });
	
		this.rootNode = null;

		console.log("Threshold: " + 0.10*game.world.width);

		var prevNode = null;
	    for ( var i=0; i<Map.CITY_COUNT; i++ ) {

			name = Map.CITY_NAMES.pop();

			var newNode, closestNode, newx, newy;
			var bailout = 0; //hail-mary in case we would otherwise infinitely loop
		    do {
				bailout++;
				console.log("new node at " + i);
				newx = Math.random();
				newy = Math.random();
				newNode = new FakeCity(name, newx, newy, game);
				closestNode = this.getClosestCity(newNode);
			} while ( this.rootNode != null && this.getCityDistance(newNode, closestNode) < 0.10*game.world.width && bailout < 20 );
			newNode = new City(name,newx,newy,game); //make a real node
			
			if ( this.rootNode != null ) {
				console.log("Decided on distance " + this.getCityDistance(newNode, closestNode) + " From closest node " + closestNode.name);
			}

            this.setNode(name, newNode);
		    if ( this.rootNode == null ) {
			    //must be the first node we've ever created
			    console.log("ROOT NODE is " + newNode.name);
			    this.rootNode = newNode;
		    } 
        }

		this.generateCityFullMesh();
		console.log("EDGES (initial): " + this.edges().length);
		this.removeIntersectingPaths();
		console.log("EDGES (pruned): " + this.edges().length);
		this.removePathsLongerThan(500);
		console.log("EDGES (shrunk): " + this.edges().length);
		this.fixOrphans();
		console.log("EDGES (fixed): " + this.edges().length);

    }
    getCities() {
        var nodes = this.nodes();
		nodes.map(function(val,idx,arr) {
			arr[idx] = this.node(val);
		},this);
		return nodes;
    }
    getClosestCity(target, orphanOnly) {
		var cities = this.getCities();
		var closest = cities[0];
        for ( var idx in cities ) {
			if ( cities[idx] != target && this.getCityDistance(target,cities[idx]) < this.getCityDistance(target,closest) ) {
				closest = cities[idx];
			}
		}
		return closest;
	}
	getConnectedCities(target) {
		var neigh = this.neighbors(target.name);
		neigh.map(function(val,idx,arr) {
			arr[idx] = this.node(val);
		},this);
		return neigh;
	}
	getRoads() {
		var roads = this.edges();
		roads.map(function(val,idx,arr) {
			arr[idx] = {
				v: this.node(val.v),
				w: this.node(val.w)
			};
		},this);
		return roads;
	}
	generateCityFullMesh() {
		var cities = this.getCities();
		for ( var idx in cities ) {
			for ( var idx2 in cities ) {
				if ( idx != idx2 && !this.hasEdge(cities[idx].name,cities[idx2].name) ) {
					this.setEdge(cities[idx].name, cities[idx2].name, cities[idx].name + " - " + cities[idx2].name);
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
					this.removeEdge(v2,w2);
				}
			}
		}
	}
	removePathsLongerThan(dist) {
		var edges = this.edges();
		for ( var idx in edges ) {
			if ( this.getCityDistance(this.node(edges[idx].v), this.node(edges[idx].w)) > dist ) {
				this.removeEdge(edges[idx].v,edges[idx].w);
			}
		}
	}
	fixOrphans() {
		var nodes = this.nodes();
		for ( var idx in nodes ) {
			if ( this.getConnectedCities(this.node(nodes[idx])).length == 0 ) {
				console.log("Fixing " + nodes[idx] + " with " + this.getClosestCity(this.node(nodes[idx])).name);
				this.setEdge(nodes[idx], this.getClosestCity(this.node(nodes[idx])).name);
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
		return (this.ccw(A,C,D) != this.ccw(B,C,D)) && (this.ccw(A,B,C) != this.ccw(A,B,D));
	}

	getCityDistance(a,b) {
		return Math.hypot(a.x-b.x, a.y-b.y); //lol
	}

	getCityAngle(a,b) {
		//thanks http://stackoverflow.com/questions/7586063/how-to-calculate-the-angle-between-a-line-and-the-horizontal-axis
		var angle = Math.atan2(a.y-b.y, a.x-b.x);
		while ( angle < 0 ) {
			angle += Math.PI * 2;
		}
		return angle;
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


