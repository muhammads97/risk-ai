import React from 'react'
import AbstractAgent from './AbstractAgent';

const states = {
    INITIAL_ASSIGN: "initialAssign",
    ATTACK: "attack",
    VICTIM: "victim",
    ASSIGN_ARMY: "assignArmy",
  };

export default class Passive  {

    constructor(id) {
        this.name = "Passive";
        this.id = id;
        this.freeArmies = 0;
        this.attackingTerritory = null;
        this.currentTerritories = {};
        this.defendingTerritory = null;
        this.gameState = states.INITIAL_ASSIGN;
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

      assignArmy(territory){
          
            let keys = Object.keys(this.currentTerritories);
            let minArmy = 2;
            let minTerr = null;
            keys.forEach((key)=>{
                let terr = this.currentTerritories[key];
                if(terr.getArmy() < minArmy){
                    console.log("here");
                    minArmy = terr.getArmy();
                    minTerr = terr;
                }
            })
            minTerr.addArmy(this.freeArmies);
            this.calculateBonusArmy();
      return true;
      }
      attack(territory) {
        this.gameState = states.ASSIGN_ARMY
        return true ;
            //DO nothing
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
          if(flag && this.gameState === states.ASSIGN_ARMY){
            return true;
          }
          return false;
        }
      }
    
      calculateBonusArmy() {
        this.freeArmies = Math.max(3, Math.floor(this.getTerritoryCount() / 3));
      }
    


    }
    

