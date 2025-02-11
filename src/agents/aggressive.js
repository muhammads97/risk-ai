import React from 'react'
import AbstractAgent from './AbstractAgent';

export default class Aggressive extends AbstractAgent {

    constructor(props) {
        super(props);
    }

    attack(game) {
        let map = game.getMap();
        let numOfOwnTerritory = this.get_own_territories(map, game);
        let newArmy = this.get_new_army(numOfOwnTerritory);
        this.addingNewArmy(newArmy, map);
        game.setMap(map);
        this.attacker();
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
        let maxi = 0;
        let y = temp[0];
        for (let x in temp) {
            if (x.getPlayer().get_Type() === "Aggressive") {
                if (x.getArmy() > maxi) {
                    y = x;
                    maxi = x.getArmy();
                }
            }
        }
        if (maxi !== 0) y.addArmy(newArmy);
    }


    attacker() {

    }
}