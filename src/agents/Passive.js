import React from 'react'
import AbstractAgent from './AbstractAgent';

const states = {
    INITIAL_ASSIGN: "initialAssign",
    ATTACK: "attack",
    VICTIM: "victim",
    ASSIGN_ARMY: "assignArmy",
  };

export default class Passive  extends AbstractAgent{


      assignArmy(territory){
          
            let keys = Object.keys(this.currentTerritories);
            let minArmy = 2;
            let minTerr = null;
            keys.forEach((key)=>{
                let terr = this.currentTerritories[key];
                if(terr.getArmy() < minArmy){
                    //console.log("here");
                    minArmy = terr.getArmy();
                    minTerr = terr;
                }
            })
            minTerr.addArmy(this.freeArmies);
            //this.calculateBonusArmy();
      return true;
      }
      attack(territory) {
        this.gameState = states.ASSIGN_ARMY;
        return true ;
            //DO nothing
        }
      
      
    


    }
    

