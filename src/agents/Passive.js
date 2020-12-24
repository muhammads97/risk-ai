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
          
        let minTerr = this.getMinArmy()
        minTerr.addArmy(this.freeArmies);
        this.freeArmies =0;
        //this.calculateBonusArmy();
        return true;
      }
      attack(territory) {
        this.gameState = states.ASSIGN_ARMY;
        return true ;
            //DO nothing
        }
      
      getMinArmy(){
        let keys = Object.keys(this.currentTerritories);
        let minArmy = -1;
        let minTerr = null;
        keys.forEach((key)=>{
            let terr = this.currentTerritories[key];
            if(terr.getArmy() < minArmy || minArmy === -1){
                //console.log("here");
                minArmy = terr.getArmy();
                minTerr = terr;
            }
        })
        return minTerr
      }
    


    }
    

