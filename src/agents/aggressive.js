import React from 'react'
import AbstractAgent from './AbstractAgent';

const states = {
    INITIAL_ASSIGN: "initialAssign",
    ATTACK: "attack",
    VICTIM: "victim",
    ASSIGN_ARMY: "assignArmy",
};

export default class Aggressive extends AbstractAgent {
    
    //assign all the free army
    //return true
    assignArmy(territory) {
        
        let maxTerr = this.getMaxArmy()
        maxTerr.addArmy(this.freeArmies);
        this.freeArmies = 0;
        //this.calculateBonusArmy();
        return true;

    }
    //perform algorithm
    //if attack -> this.attackingTerritory , this.defendingTerritory
    //this.gameState = states.VICTIM; attack
    //return true
    //else -> this.attackingTerritory , this.defendingTerritory =null
    //this.gameState = states.ASSIGN_ARMY; end turn
    //return true

    attack(territory) {
        let maxTerr = this.getMaxArmy()
        if(maxTerr == null || maxTerr.getArmy() == 1 || maxTerr.getAdjEnemy().length === 0){
            this.gameState = states.ASSIGN_ARMY;
            return true;
        }
        let maxdef = this.getMaxEnemy(maxTerr)
        this.attackingTerritory = maxTerr;
        this.defendingTerritory = maxdef;
        this.performAttack();
        this.gameState = states.VICTIM;
        return true;
    }

    getMaxArmy(){
        let keys = Object.keys(this.currentTerritories);
        let maxArmy = 1;
        let maxTerr = null;
        keys.forEach((key) => {
            let terr = this.currentTerritories[key];
            if (terr.getArmy() >= maxArmy) {
                //console.log("here");
                maxArmy = terr.getArmy();
                maxTerr = terr;
            }
        })
        return maxTerr
    }
    getMaxEnemy(terr){
        let adjEnemy = terr.getAdjEnemy();
        let maxArmy = 1;
        let maxTerr = null;
        adjEnemy.forEach(t =>{
            if(t.getArmy() >= maxArmy){
                maxArmy = t.getArmy();
                maxTerr = t;
            }
        })
        return maxTerr;
    }

}