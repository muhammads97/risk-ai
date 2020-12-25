import React from 'react'
import AbstractAgent from './AbstractAgent';
import heuristic from "./heuristic";
import EgyptMap from "./maps/EgyptMap";
import PriorityQueue from "priorityqueue";
import {clone, cloneDeep} from "@babel/types";

var HashSet = require('hashset');




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

    A_star(freeArmies, state) {
        var pq = PriorityQueue();
        var hashset = new HashSet();
        pq.push(new ent(0, state, []));
        let cur_st = pq.top.y;
        let cur_dist = pq.top.x;
        pq.pop();
        hashset.add(cur_st);
        let ownT = cur_st.currentTerritories;
        for (let ter in ownT) {
            let adjs = ter.getAdjEnemy();
            for (let adjT in adjs) {
                let f = new heuristic(ownT, ter, adjT); // ToDo get f = g + h  from salah. how??
                let x = cloneDeep(cur_st);

                getAgent().setAttackingTerritory(ter);
                st.getAgent().setAttackingTerritory(adjT);
                st.getAgent().performAttack();
                pq.push(new ent(f, st, null, null));
            }
        }
        while (!pq.empty) {
            let cur_st = pq.top.y;
            let cur_dist = pq.top.x;
            let atk = pq.top.a;
            let def = pq.top.b;

            for (let ter in ownT) {
                let adjs = ter.getAdj();
                for (let adjT in adjs) {

                }
            }

        }
    }

}