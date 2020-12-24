import React from 'react'
import AbstractAgent from './AbstractAgent';

const states = {
  INITIAL_ASSIGN: "initialAssign",
  ATTACK: "attack",
  VICTIM: "victim",
  ASSIGN_ARMY: "assignArmy",
};
export default class pacifist extends AbstractAgent {

    assignArmy(territory){
          
        let minTerr = this.getMinArmy()
        minTerr.addArmy(this.freeArmies);
        this.freeArmies =0;
        //this.calculateBonusArmy();
        return true;
      }
      attack(territory){
        let minArmy = this.getMinEnemy();
        let keys = Object.keys(this.currentTerritories);
        let attacking = null;
        let defending = null;
        keys.forEach((key) => {
          let terr = this.currentTerritories[key];  
          console.log(terr);
          console.log(terr.getAdjEnemy().length)
          if(terr.getArmy() > 1 && terr.getAdjEnemy().length !== 0){
            terr.getAdjEnemy().find(enemy => {
              console.log(enemy);
              if(enemy.getArmy() === minArmy){
                attacking = terr;
                defending = enemy;
                return true;
              }
              return false;
            })
          }
        })
        //Here i assumed it will only attack once because the way it's writtern in the requirements.
        if(attacking != null && defending != null && this.gameState === states.ATTACK ){
          console.log("here")
          this.gameState = states.VICTIM;
          this.attackingTerritory = attacking;
          this.defendingTerritory = defending;
          this.performAttack();
        }else{
          this.gameState = states.ASSIGN_ARMY;
        }
        
        return true;
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

      getMinEnemy(){
        let enemyTerrs = this.getEnemyTerritories();
        let keys = Object.keys(enemyTerrs);
        let minArmy =-1;
        keys.forEach(key => {
            let terr = enemyTerrs[key];
            if(minArmy === -1 || terr.getArmy() < minArmy){
                minArmy = terr.getArmy();
            }
        })
        return minArmy;
      }

}
