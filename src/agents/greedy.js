import AbstractAgent from './AbstractAgent';
import {h} from './heuristic';

const clonedeep = require('lodash.clonedeep')

const states = {
    INITIAL_ASSIGN: "initialAssign",
    ATTACK: "attack",
    VICTIM: "victim",
    ASSIGN_ARMY: "assignArmy",
};

export default class Aggressive extends AbstractAgent {
    //assume i have the state currentState
    assignArmy(currentState) {
        this.l ++;
        let minH = h(currentState);
        //console.log("base h " ,minH)
        let assignName = null;
        let keys = Object.keys(currentState.territories);
        keys.forEach(key => {
            let terr = currentState.territories[key];
            terr["army"] += this.freeArmies;
            //for each own terr that u can attack from 
            if (terr["agent"] === this.getId() && terr["army"] !== 1) {
                let enemyAdj =
                    terr["adj"].filter((t) => currentState.territories[t]["agent"] !== this.getId());
                //only if u can attack
                if (enemyAdj.length !== 0) {
                    //for each adj enemy of this (own) terr
                    enemyAdj.forEach(enemy => {
                        this.t++;
                        let nextState = this.mimicAttack(key, enemy, currentState);
                        let newh = h(nextState);
                        /*console.log("==================")
                        console.log("attacking " ,key)
                        console.log("defending " ,enemy)
                        console.log("h " ,newh)*/
                        if (newh <= minH) {
                            assignName = key;
                            minH = newh;
                        }
                    })
                }
            }
            terr["army"] -= this.freeArmies;
        })
        if (assignName === null) {
            //no attack is better so we assign 1 to many random terrs
            let j = 0;
            for (let i = 0; i < this.freeArmies; i++) {
                let name = keys[j % (keys.length)];
                let assign = this.currentTerritories[name];
                if (assign.getAdjEnemy().length !== 0) {
                    assign.addArmy(1);
                } else {
                    i--;
                }
                j++;
            }
        } else {
            let assign = this.currentTerritories[assignName];
            assign.addArmy(this.freeArmies);
        }

        this.freeArmies = 0;
        return true;
    }

    attack(currentState) {
        let minH = h(currentState);
        let attackName = null;
        let defendName = null;
        let keys = Object.keys(currentState.territories);
        keys.forEach(key => {
            let terr = currentState.territories[key];
            //terr["army"] += this.freeArmies;
            //for each own terr that u can attack from 
            if (terr["agent"] === this.getId() && terr["army"] !== 1) {
                let enemyAdj =
                    terr["adj"].filter((t) => currentState.territories[t]["agent"] !== this.getId());
                //only if u can attack
                if (enemyAdj.length !== 0) {
                    //for each adj enemy of this (own) terr
                    enemyAdj.forEach(enemy => {
                        this.t++;
                        let nextState = this.mimicAttack(key, enemy, currentState);
                        let newh = h(nextState);
                        if (newh <= minH) {
                            attackName = key;
                            defendName = enemy;
                            minH = newh;
                        }
                    })
                }
            }
            //terr["army"] -= this.freeArmies;
        })
        if (attackName === null) {
            this.gameState = states.ASSIGN_ARMY;
        } else {
            //console.log(attackName);
            this.attackingTerritory = this.currentTerritories[attackName];

            //console.log(this.attackingTerritory);
            this.defendingTerritory = this.getEnemyTerritories()[defendName];
            this.performAttack()
            this.gameState = states.VICTIM;
        }
        return true;
    }

    mimicAttack(attackingName, defendingName, state) {
        //deepclone the state
        let newState = clonedeep(state);
        let attacking = newState.territories[attackingName];
        let defending = newState.territories[defendingName];
        const attarmy = attacking["army"];
        const defarmy = defending["army"];
        if (attarmy == defarmy) {
            attacking["army"] = 1;
            defending["army"] = 1;
        } else if (attarmy > defarmy) {
            defending["agent"] = attacking["agent"];
            defending["army"] = attarmy - defarmy;
            attacking["army"] = 1;
        } else {
            attacking["army"] = 1;
            defending["army"] -= (attarmy - 1);
        }
        return newState;
    }


}