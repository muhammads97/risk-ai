import React from 'react'
import AbstractAgent from './AbstractAgent';

const states = {
  INITIAL_ASSIGN: "initialAssign",
  ATTACK: "attack",
  VICTIM: "victim",
  ASSIGN_ARMY: "assignArmy",
};

export default class HumanAgent  extends AbstractAgent{
  

  

  //common step with diff algs and with agents will do all the assignment and returns true
  assignArmy(territory){
    if (
      territory.name in this.currentTerritories
    ) {
      territory.addArmy(1);
      this.freeArmies--;
      if (this.freeArmies === 0) {
        //this.calculateBonusArmy();
        return true;
      }
  }
  }
  attack(territory) {
    if (
      territory.name in this.currentTerritories 
    ) {
      this.defendingTerritory = null;
      if(territory.getArmy() !== 1 && territory.getAdjEnemy().length !== 0){
        //console.log(territory.getAdjEnemy().length)
        this.attackingTerritory = territory;
        this.gameState = states.VICTIM;
        return false;
      }else{
        this.attackingTerritory = null;
        this.gameState = states.ATTACK;
        return false;
      }
      
    } else if (
      this.gameState === states.VICTIM &&
      this.attackingTerritory.isAdjEnemy(territory)
    ) {
      this.defendingTerritory = territory;
      this.performAttack();
      //this.gameState = states.ASSIGN_ARMY;
      //this.calculateBonusArmy();
      return true;
    } else {
      //alert
      return false;
    }
  }
  

  



  
}


