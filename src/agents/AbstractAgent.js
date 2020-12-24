import * as React from 'react'

const states = {
    INITIAL_ASSIGN: "initialAssign",
    ATTACK: "attack",
    VICTIM: "victim",
    ASSIGN_ARMY: "assignArmy",
  };

export default class AbstractAgent {
    constructor(id,name) {
        this.name = name;
        this.id = id;
        this.freeArmies = 0;
        this.attackingTerritory = null;
        this.currentTerritories = {};
        this.defendingTerritory = null;
        this.gameState = states.INITIAL_ASSIGN;
      }

      updateState(territory) {
        if (
          this.gameState === states.INITIAL_ASSIGN ||
          this.gameState === states.ASSIGN_ARMY
        ) {
          
          let finished = this.assignArmy(territory);
          if(finished){
            if(this.gameState === states.INITIAL_ASSIGN){
              this.gameState = states.ASSIGN_ARMY ;
              return true;
            }else{
              this.gameState = states.ATTACK ;
              return false;
            }
          } 
        } else{
          let flag = this.attack(territory);
          if(flag){
            return true;
          }
          return false;
        }
      }

      //fixed in all agents
  performAttack() {
    const attarmy = this.attackingTerritory.getArmy();
    const defarmy = this.defendingTerritory.getArmy();
    //case draw
    if (attarmy == defarmy) {
      this.attackingTerritory.removeArmy(attarmy - 1);
      this.defendingTerritory.removeArmy(defarmy - 1);
    } else if (attarmy > defarmy) {
      this.defendingTerritory
        .getAgent()
        .removeTerritory(this.defendingTerritory);
      this.currentTerritories[
        this.defendingTerritory.name
      ] = this.defendingTerritory;
      this.defendingTerritory.setAgent(this);
      this.defendingTerritory.removeArmy(defarmy - (attarmy - defarmy ));
      this.attackingTerritory.removeArmy(attarmy - 1);
    } else {
      this.attackingTerritory.removeArmy(attarmy - 1);
      this.defendingTerritory.removeArmy(attarmy - 1);
    }
    
  }


      calculateBonusArmy() {
        if(this.gameState !== states.INITIAL_ASSIGN){
          this.freeArmies = Math.max(3, Math.floor(this.getTerritoryCount() / 3));
        }
      }



      getId() {
        return this.id;
      }
      getDefendingTerritory() {
        return this.defendingTerritory;
      }
      getAttackingTerritory() {
        return this.attackingTerritory;
      }
      setDefendingTerritory(territory) {
        this.defendingTerritory = territory;
      }
      setAttackingTerritory(territory) {
        this.attackingTerritory = territory;
      }
      addTerritory(territory) {
        this.currentTerritories[territory.name] = territory;
      }
      removeTerritory(territory) {
        delete this.currentTerritories[territory.name];
      }
    
      getTerritoryCount() {
        return Object.getOwnPropertyNames(this.currentTerritories).length;
      }
    
      setFreeArmies(freeArmy) {
        this.freeArmies = freeArmy;
      }
      
      getEnemyTerritories(){
        let keys = Object.keys(this.currentTerritories);
        let name = keys.find(key =>  this.currentTerritories[key].getAdjEnemy().length !== 0);
        let enemyTerrs = this.currentTerritories[name].getAdjEnemy();
        return enemyTerrs[0].getAgent().currentTerritories;
      }

}