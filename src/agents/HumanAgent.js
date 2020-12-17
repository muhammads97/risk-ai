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

  attack() {}
  updateState(territory) {
    if (
      this.gameState === states.INITIAL_ASSIGN &&
      territory.name in this.currentTerritories
    ) {
      territory.addArmy(1);
      this.freeArmies--;
      if (this.freeArmies === 0) {
        this.gameState = states.ASSIGN_ARMY;
        this.calculateBonusArmy();
        return true;
      }
    } else if (
      this.gameState === states.ASSIGN_ARMY &&
      territory.name in this.currentTerritories
    ) {
      territory.addArmy(1);
      this.freeArmies--;
      if (this.freeArmies === 0) {
        this.gameState = states.ATTACK;
        return false;
      }
    } else if (
      this.gameState === states.ATTACK &&
      territory.name in this.currentTerritories
    ) {
      this.attackingTerritory = territory;
      this.gameState = states.VICTIM;
      return false;
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
    }
  }

  calculateBonusArmy() {
    this.freeArmies = Math.max(3, Math.floor(this.getTerritoryCount() / 3));
  }

  //FIXME

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
      this.defendingTerritory.removeArmy(defarmy - (attarmy - defarmy + 1));
      this.attackingTerritory.removeArmy(attarmy - 1);
    } else {
      this.attackingTerritory.removeArmy(attarmy - 1);
      this.defendingTerritory.removeArmy(attarmy - 1);
    }
    // need to update the total army  and total terrs in both agents
  }
}

//we need to loop on both the assign and the attack till they return true
