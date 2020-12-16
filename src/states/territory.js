export default class Territory {
  constructor(name) {
    this.name = name;
    this.agent = null;
    this.army = 0;
    this.adj = [];
  }

  setAgent(agent) {
    this.agent = agent;
  }
  getAgent() {
    return this.agent;
  }

  addArmy(army) {
    this.army += army;
  }
  removeArmy(army) {
    this.army -= army;
    if (this.army <= 0) return true; // agent lost this territory
    return false; //agent still owns this territory
  }
  getArmy() {
    return this.army;
  }

  addAdjTerritory(territory) {
    this.adj.push(territory);
    if (!territory.isAdj(this.name)) {
      territory.addAdjTerritory(this);
    }
  }
  removeAdjTerritory(name) {
    let index = -1;
    this.adj.forEach((t, i) => {
      if (t.name == name) {
        index = i;
        return;
      }
    });
    this.adj.splice(index, 1);
  }
  getAdj() {
    return this.adj;
  }

  isAdjEnemy(victim) {
    return  this.adj.filter((t) => t.agent.getId() !== this.agent.getId()).find((t) => victim.name === t.name) != null; 
  }

  getAdjOwned() {}

  getName() {
    return this.name;
  }

  isAdj(name) {
    return this.adj.find((t) => t.name == name) != null;
  }

  getAdjTerritory(ter) {
    return this.adj.find((t) => t.name == ter.name);
  }
}
