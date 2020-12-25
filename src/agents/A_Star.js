import React from 'react'
import AbstractAgent from './AbstractAgent';
import heuristic from "./heuristic";
import EgyptMap from "./maps/EgyptMap";
import PriorityQueue from "priorityqueue";
import cloneDeep from "lodash.clonedeep";
import HashSet from 'hashset'


/*
class ent {
    constructor(x, y, z) {
        this.x = x; // f = g + h
        this.y = y; // state
        this.z = z; // list of att -> dif -> dif -> dif -> ....
    }
}
*/

const states = {
    INITIAL_ASSIGN: "initialAssign",
    ATTACK: "attack",
    VICTIM: "victim",
    ASSIGN_ARMY: "assignArmy",
};

export default class Aggressive extends AbstractAgent {

    //assign all the free army
    //return true
    assignArmy(territory) {
        let best_pair = A_star(this.freeArmies);
    }

    attack(territory) {

    }
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
            this.defendingTerritory.removeArmy(defarmy - (attarmy - defarmy));
            this.attackingTerritory.removeArmy(attarmy - 1);
        } else {
            this.attackingTerritory.removeArmy(attarmy - 1);
            this.defendingTerritory.removeArmy(attarmy - 1);
        }
    }
    //attacking :string ,  defending: string
    simulateAttack(state, attacking, defending) {
        const attarmy = state.territories[attacking]["army"]
        const defarmy = state.territories[defending]["army"]
        //case draw
        if (attarmy == defarmy) {
            state.territories[attacking]["army"] = 1;
            state.territories[defending]["army"] = 1;
        } else if (attarmy > defarmy) {
            state.territories[defending]["agent"] = state.territories[attacking]["agent"]
            state.territories[defending]["army"] = state.territories[attacking]["army"] - state.territories[defending]["army"] - 1;
            state.territories[attacking]["army"] = 1;
        } else {
            state.territories[defending]["army"] -= (state.territories[attacking]["army"] - 1);
            state.territories[attacking]["army"] = 1;
        }
        return state;
    }
    A_star(freeArmies, state) {

        var pq = PriorityQueue();
        var hashset = new HashSet();
        pq.push({ f: 0, state: state, path: [] });
        var pqtop = cloneDeep(pq.top);
        var cur_st = pqtop.state;
        var cur_dist = pqtop.f;
        var path = pqtop.path;
        pq.pop();
        hashset.add(cur_st);
        let allTers = cur_st.territories;
        for (let att in allTers) {
            if (allTers[att]["agent"] === this.getId())
                for (let def in allTers) {
                    if (allTers[def]["agent"] !== this.getId()) {

                        let f = new heuristic(ownT, att, def); // ToDo get f = g + h  from salah. how??
                        let dcstate = cloneDeep(cur_st);
                        let copypath = cloneDeep(path);
                        dcstate.territories[att]["agent"] += freeArmies;
                        copypath.push(att);
                        copypath.push(def);
                        dcstate = simulateAttack(dcstate, att, def)
                        pq.push({ f: f, state: dcstate, path: copypath });
                    }
                }
        }
        while (!pq.empty) {
            let cur_entry = pq.top;
            pq.pop();
            var cur_st = cur_entry.state;
            var path = cur_entry.path;
            hashset.add(cur_st);
            for (let att in allTers) {
                if (allTers[att]["agent"] === this.getId())
                    for (let def in allTers) {
                        if (allTers[def]["agent"] !== this.getId()) {
                            let f = new heuristic(ownT, att, def); // ToDo get f = g + h  from salah. how??
                            let dcstate = cloneDeep(cur_st);
                            let copypath = cloneDeep(path);
                            copypath.push(def);
                            dcstate = simulateAttack(dcstate, att, def)
                            if(!hashset.contains(cur_st))
                                pq.push({ f: f, state: dcstate, path: copypath });
                        }
                    }
            }
        }
    }

}