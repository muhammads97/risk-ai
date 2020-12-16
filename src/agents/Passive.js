import React from 'react'
import AbstractAgent from './AbstractAgent';

export default class Passive extends AbstractAgent {

    constructor(props) {
        super(props);
    }

    attack(game) {
        let map = game.getMap();
        let numOfOwnTerritory = this.get_own_territories(map, game);
        let newArmy = this.get_new_army(numOfOwnTerritory);
        this.addingNewArmy(newArmy, map);
        game.setMap(map);
    }

    get_own_territories(map, game) {
        // return the number of his own territories.
        let temp = map.getTerritories();
        let ret = 0;
        for (let x in temp) {
            if (x.getAgent() === game.getTurn()) {
                ret++;
            }
        }
        return ret;
    }

    get_new_army(numOfOwnTerritory) {
        // return bonus army.
        return Math.floor(numOfOwnTerritory / 3);
    }

    addingNewArmy(newArmy, map) {
        // add new Army to the territory with the lowest number of army.
        let temp = map.getTerritories();
        let mini = 100;
        let y = temp[0];
        for (let x in temp) {
            if (x.getPlayer().get_Type() === "Passive") {
                if (x.getArmy() < mini) {
                    y = x;
                    mini = x.getArmy();
                }
            }
        }
        if (mini !== 100) y.addArmy(newArmy);
    }
}
