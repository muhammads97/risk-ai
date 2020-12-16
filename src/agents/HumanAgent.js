export default class HumanAgent {
  constructor() {
    this.totalArmy =0;
    this.totalTerrs =0;
    this.currMap = null;
    this.attackingTerritory = null;
    this.defendingTerritory = null;
  }
  attack(){

  }
  //FIXME 

  //fixed in all agents
  performAttack(attackingTerritory,defendingTerritory){
    const attarmy = attackingTerritory.getArmy();
    const defarmy = defendingTerritory.getArmy();
    //case draw
    if( attarmy == defarmy ){
      attackingTerritory.removeArmy(attarmy-1);
      defendingTerritory.removeArmy(defarmy-1);
    }else if(attarmy > defarmy){
      defendingTerritory.setAgent(attackingTerritory.getAgent());
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
      if(selectedTerritory.getAgent() != gameState.getTurn()){
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