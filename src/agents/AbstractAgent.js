import * as React from 'react'

export default class AbstractAgent {
    constructor(props) {
        this.currmap = null;
        this.totalTerrs = 0;
    }

    attack(game) {

    }

    assignArmy(game) {
        this.currmap = game.getMap();
        let territories = this.currmap.getTerritories();

        territories = shuffle(territories)

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        for (let x in territories) {
            if (x.getAgent() === game.getTurn()) {
                x.addArmy(1);
                break;
            }
        }

        game.setMap(this.currmap);  // I have no idea how this.currmap will update the map.
    }
}