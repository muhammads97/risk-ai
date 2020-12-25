import AbstractAgent from "./AbstractAgent";
import { h } from "./heuristic";

const states = {
  INITIAL_ASSIGN: "initialAssign",
  ATTACK: "attack",
  VICTIM: "victim",
  ASSIGN_ARMY: "assignArmy",
};

const INFINITY = 10000000000;
const MAX_DEPTH = 5;

export default class Minimax extends AbstractAgent {
  minimax(state, depth, alpha, beta) {
    if (this.isLeave(state) || depth > MAX_DEPTH) {
      return this.getLeaveValue(state);
    }

    if (state.agent == this.id) {
      let bestVal = INFINITY;
      let children = this.getChildrenStates(state);
      children.every((child) => {
        let value = this.minimax(child, depth + 1, alpha, beta);
        bestVal = Math.min(bestVal, value);
        alpha = Math.min(alpha, bestVal);
        if (beta >= alpha) {
          return false;
        }
        return true;
      });
      return bestVal;
    } else {
      let bestVal = -INFINITY;
      let children = this.getChildrenStates(state);
      children.every((child) => {
        let value = this.minimax(child, depth + 1, alpha, beta);
        bestVal = Math.max(bestVal, value);
        beta = Math.max(beta, bestVal);
        if (beta >= alpha) {
          return false;
        }
        return true;
      });

      return bestVal;
    }
  }

  isLeave(state) {
    let t1 = 0;
    let t2 = 0;
    Object.keys(state.territories).every((k) => {
      if (state.territories[k].agent == state.agent) {
        t1++;
      } else {
        t2++;
      }
      return true;
    });
    return t1 == 0 || t2 == 0;
  }
  getLeaveValue(state) {
    if (state.agent == this.id) {
      return h(state);
    } else {
      let stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.agent = this.id;
      return h(stateCopy);
    }
  }

  getChildrenStates(state) {
    let children = [];
    if (state.freeArmies) {
      Object.keys(state.territories).forEach((k) => {
        if (state.territories[k].agent == state.agent) {
          let newState = JSON.parse(JSON.stringify(state));
          newState.territories[k].army += state.freeArmies;
          newState.freeArmies = null;
          newState.assignTo = k;
          children.push(newState);
        }
      });
      return children;
    }

    Object.keys(state.territories).forEach((k) => {
      if (state.territories[k].agent == state.agent) {
        if (state.territories[k].army > 1) {
          state.territories[k].adj.forEach((a) => {
            if (state.territories[a].agent != state.agent) {
              let newState = this.fakeAttack(state, k, a);
              newState.attacker = k;
              newState.defender = a;
              children.push(newState);
            }
          });
        }
      }
    });
    let endTurnState = JSON.parse(JSON.stringify(state));
    endTurnState.agent = 3 - state.agent;
    endTurnState.freeArmies = this.calculateFreeArmy(endTurnState);
    children.push(endTurnState);
    return children;
  }

  calculateFreeArmy(state) {
    let t = 0;
    Object.keys(state.territories).forEach((k) => {
      if (state.territories[k].agent == state.agent) {
        t++;
      }
    });
    return Math.floor(t / 3) >= 3 ? Math.floor(t / 3) : 3;
  }

  fakeAttack(state, attacker, defender) {
    let stateCopy = JSON.parse(JSON.stringify(state));
    let army1 = stateCopy.territories[attacker].army;
    let army2 = stateCopy.territories[defender].army;
    if (army1 == army2) {
      stateCopy.territories[attacker].army = 1;
      stateCopy.territories[defender].army = 1;
    } else if (army1 > army2) {
      stateCopy.territories[defender].agent = stateCopy.agent;
      stateCopy.territories[defender].army = army1 - army2;
      stateCopy.territories[attacker].army = 1;
    } else {
      stateCopy.territories[attacker].army = 1;
      stateCopy.territories[defender].army = army2 - (army1 - 1);
    }
    return stateCopy;
  }

  assignArmy(state) {
    state.freeArmies = this.freeArmies;
    let children = this.getChildrenStates(state);
    let bestVal = INFINITY;
    let bestTerr = "";
    children.forEach((child) => {
      let value = this.minimax(child, 0, INFINITY, -INFINITY);
      if (value < bestVal) {
        bestVal = value;
        bestTerr = child.assignTo;
      }
    });
    this.currentTerritories[bestTerr].addArmy(this.freeArmies);
    this.freeArmies = 0;
    return true;
  }

  attack(state) {
    let children = this.getChildrenStates(state);
    let bestVal = INFINITY;
    let bestChild = null;
    children.forEach((child) => {
      let value = this.minimax(child, 0, INFINITY, -INFINITY);
      if (value < bestVal) {
        bestVal = value;
        bestChild = child;
      }
    });
    if (bestChild.agent != this.id) {
      // no attack
      this.gameState = states.ASSIGN_ARMY;
    } else {
      this.attackingTerritory = this.currentTerritories[bestChild.attacker];
      this.attackingTerritory.getAdjEnemy().every((e) => {
        if (e.name == bestChild.defender) {
          this.defendingTerritory = e;
          return false;
        }
        return true;
      });
      this.performAttack();
      this.gameState = states.VICTIM;
    }
    return true;
  }
}
