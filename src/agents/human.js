export default class HumanAgent {
  constructor() {
    let totalArmy =0;
    let totalTerrs =0;
    let currMap = null;
    let attackingTerritory = null;
    let defendingTerritory = null;
  }
  attack(gameState) {
    this.currMap = gameState.getMap();
    gameState.selectTerritory("attack", (selectedTerritory) => {

      if(selectedTerritory.getPlayer != gameState.getTurn() || selectedTerritory.getArmy() == 1
      || selectedTerritory.getAdjEnemy().length == 0){
        /*
          alert you cant choose this terr as  attacking terr
        */
        return false;
      }

      this.attackingTerritory = selectedTerritory;
      gameState.selectTerritory("victim", (selectedTerritory) => {
        if(selectedTerritory.getPlayer == gameState.getTurn() ||
         !attackingTerritory.getAdjEnemy().includes(selectedTerritory)){
          /*
            alert you cant choose this terr as  defending terr
          */
           return false;
        }
        this.defendingTerritory = selectedTerritory;
        return true;
      });
    });
    //asynch  ? so we need to move these in the second callback
    performAttac(this.attackingTerritory,this.defendingTerritory);
    gameState.setMap(this.currMap);
  }
  //fixed in all agents
  performAttac(attackingTerritory,defendingTerritory){
    attarmy = attackingTerritory.getArmy();
    defarmy = defendingTerritory.getArmy();
    //case draw
    if( attarmy == defarmy ){
      attackingTerritory.removeArmy(attarmy-1);
      defendingTerritory.removeArmy(defarmy-1);
    }else if(attarmy > defarmy){
      defendingTerritory.setPlayer(attackingTerritory.getPlayer());
      defendingTerritory.removeArmy(defarmy-(attarmy-defarmy+1));
      attackingTerritory.removeArmy(attarmy-1);
    }else{
      attackingTerritory.removeArmy(attarmy-1);
      defendingTerritory.removeArmy(attarmy-1);
    }
    // need to update the total army  and total terrs in both agents

  }
//for simplicity we will assign 1 only each selection
  assignArmy(gameState) {
    this.currMap = gameState.getMap();
    gameState.selectTerritory("assign", (selectedTerritory) => {
      if(selectedTerritory.getPlayer != gameState.getTurn()){
        /*
          alert you cant choose this terr as  assign terr
        */
         return false;
      }
      selectedTerritory.addArmy(1);
    });
    gameState.setMap(this.currMap);
    //we should have a number showing how many amy left to be assigned 
    // and we decrease it from the game state each time we assign 
    //looping on this number and calling the assign once each iteration
  }
}

//we need to loop on both the assign and the attack till they return true