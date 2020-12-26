import AbstractAgent from './AbstractAgent';
import {g, h} from "./heuristic";
import PriorityQueue from "priorityqueue";
import clonedeep from "lodash.clonedeep";
import HashSet from 'hashset'


const states = {
    INITIAL_ASSIGN: "initialAssign",
    ATTACK: "attack",
    VICTIM: "victim",
    ASSIGN_ARMY: "assignArmy",
};

export default class Astar extends AbstractAgent {
    /**
     *
     * @param {unique number of the agent} id
     * @param {name of the agent} name
     * @param {type of Astar agent whether it is a realtime or not} type
     */
    constructor(id, name, type) {
        super(id, name);
        this.best_path = null;
        this.index = 0;
        this.type = type;
    }

    //assign all the free army
    //return true
    // kind === true if A_star.
    // kind === false if A_star_real_time.
    assignArmy(state) {
        this.best_path = this.A_star(this.freeArmies, state);
        let att = this.currentTerritories[this.best_path[0]];
        att.addArmy(this.freeArmies);
        this.freeArmies = 0;
        return true;
    }

    attack(state) {
        // attack , defending territories
        // if path finished => this.state = assgin army, 
        // else path not finished => this.state = Victim 5lst el attack el adem (continue attacking), 
        //best path
        let att = this.currentTerritories[this.best_path[this.index++]];   // ToDo Check validation of this.
        if (this.index >= this.best_path.length) {
            this.gameState = states.ASSIGN_ARMY;
            return true;
        }
        let def = this.getEnemyTerritories()[this.best_path[this.index++]];  // ToDo Check validation of this.
        this.attackingTerritory = att;
        this.defendingTerritory = def;
        this.performAttack();
        this.gameState = states.VICTIM;
        return true;

    }


    A_star(freeArmies, state) {

        // helper methods.
        const boolAttack = (currentState, attacking, defending) => {
            const attarmy = currentState.territories[attacking]["army"];
            const defarmy = currentState.territories[defending]["army"];
            return (attarmy >= defarmy);
        };

        //attacking :string ,  defending: string
        const simulateAttack = (currentState, attacking, defending) => {
            const attarmy = currentState.territories[attacking]["army"];
            const defarmy = currentState.territories[defending]["army"];
            //case draw
            if (attarmy === defarmy) {
                currentState.territories[attacking]["army"] = 1;
                currentState.territories[defending]["army"] = 1;
            } else if (attarmy > defarmy) {
                currentState.territories[defending]["agent"] = currentState.territories[attacking]["agent"];
                currentState.territories[defending]["army"] = currentState.territories[attacking]["army"] - currentState.territories[defending]["army"] - 1;
                currentState.territories[attacking]["army"] = 1;
            } else {
                currentState.territories[defending]["army"] -= (currentState.territories[attacking]["army"] - 1);
                currentState.territories[attacking]["army"] = 1;
            }
            return currentState;
        };
        const allAquired = (territories) => {
            for (let att in territories) {
                if (allTers[att]["agent"] !== this.getId())
                    return false;
            }
            return true;
        };


        var best_path = null;
        var best_val = Infinity;
        const comparator = (state1, state2) => {
            return (state1.f < state2.f ? 1 : state1.f > state2.f ? -1 : 0);
        };
        var pq = new PriorityQueue({comparator});
        var hashset = new HashSet();

        var initialState = {f: 0, h: 0, g: 0, state: state, path: []};

        var initialStateCopy = clonedeep(initialState);
        var cur_f = initialStateCopy.f;
        var cur_h = initialStateCopy.h;
        var cur_g = initialStateCopy.g;
        var cur_st = initialStateCopy.state;
        var path = initialStateCopy.path;
        let allTers = cur_st.territories;
        for (let att in allTers) {
            //run A* here and start with each attacking terr as root
            if (allTers[att]["agent"] === this.getId()) {
                let nextState = clonedeep(cur_st);
                let nextpath = clonedeep(path);
                nextState.territories[att]["army"] += freeArmies;
                pq.push({f: 0, h: 0, g: 0, state: nextState, path: nextpath});
            }
        }


        while (!pq.empty) {
            let pqtop = clonedeep(pq.top());
            console.log(pqtop)
            cur_f = pqtop.f;
            cur_h = pqtop.h;
            cur_g = pqtop.g;
            cur_st = pqtop.state;
            path = pqtop.path;
            pq.pop();
            hashset.add(cur_st);
            if (allAquired(cur_st.territories)) {
                return path;
            }
            let deadState = true;
            allTers = cur_st.territories;
            for (let att in allTers)
                if (allTers[att]["agent"] === this.getId() && allTers[att]["army"] > 1) {
                    allTers[att]["adj"].forEach(def => {
                        if (allTers[def]["agent"] !== this.getId()) {
                            let nextState = clonedeep(cur_st);
                            let copypath = clonedeep(path);
                            if (!boolAttack(nextState, att, def)) {
                                if (cur_f < best_val) {
                                    best_path = path;
                                    best_val = cur_f;
                                }
                                return;
                            }
                            copypath.push(att);
                            copypath.push(def);
                            nextState = simulateAttack(nextState, att, def)
                            let newg = g(nextState, cur_st);
                            if (this.kind)
                                newg += cur_g;
                            let newh = h(nextState);
                            if (!hashset.contains(nextState)) {
                                // console.log({ f: (newh + newg), h: newh, g: newg, state: nextState, path: copypath });
                                pq.push({f: (newh + newg), h: newh, g: newg, state: nextState, path: copypath});
                                deadState = false;
                            }
                        }
                    });
                }


            if (deadState && cur_f < best_val) {
                best_path = path;
                best_val = cur_f;
            }
        }
        console.log("dead state")
        return best_path;
    }

}