'use strict';

var game = new Phaser.Game(1024, 640)

// game.state.add('upgrade', Upgrade, true)
game.state.add('travel', Travel, true)
game.state.add('overworld', Overworld, true)
game.state.add('start', Start, true)