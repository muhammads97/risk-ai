const states = {
  INITIAL_ASSIGN: "initialAssign",
  ATTACK: "attack",
  VICTIM: "victim",
  ASSIGN_ARMY: "assignArmy",
};

export default class HumanAgent {
  constructor(id) {
    this.name = "Human";
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

  //common step with diff algs and with agents will do all the assignment and returns true
  assignArmy(territory){
    if (
      territory.name in this.currentTerritories
    ) {
      territory.addArmy(1);
      this.freeArmies--;
      if (this.freeArmies === 0) {
        this.calculateBonusArmy();
        return true;
      }
  }
  }
  attack(territory) {
    if (
      territory.name in this.currentTerritories 
    ) {
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
      this.gameState = states.ASSIGN_ARMY;
      this.calculateBonusArmy();
      return true;
    } else {
      //alert
      return false;
    }
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
}


