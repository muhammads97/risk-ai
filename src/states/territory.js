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
  }
  getArmy() {
    return this.army;
  }
  //does this make duplicates ?
  addAdjTerritory(territory) {
    this.adj.push(territory);
    if (!territory.isAdj(this.name)) {
      territory.addAdjTerritory(this);
    }
  }
  
  isAdj(name) {
    return this.adj.find((t) => t.name == name) != null;
  }

  getAdj() {
    return this.adj;
  }

  isAdjEnemy(victim) {
    return  this.getAdjEnemy().find((t) => victim.name === t.name) != null; 
  }

  getAdjEnemy() {
    return this.adj.filter((t) => t.agent.getId() !== this.agent.getId())
  }

  getName() {
    return this.name;
  }

}
