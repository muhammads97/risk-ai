import * as React from "react";
import "../App.css";
import EgyptTerritories from "../helper/EgyptTerritories";
import { h } from "../agents/heuristic";

const states = {
  INITIAL_ASSIGN: "initialAssign",
  ATTACK: "attack",
  VICTIM: "victim",
  ASSIGN_ARMY: "assignArmy",
};

const initialArmy = 20;
var gameEnded = false;
export default class EgyptMap extends React.Component {
  constructor(props) {
    super(props);
    let egyptTerritories = new EgyptTerritories();
    this.territories = egyptTerritories.getTerritories();
    this.locations = egyptTerritories.getLocations();
    this.agent1 = props.agent1;
    this.agent2 = props.agent2;
    this.turn = null;
    this.initialArmy = 20;

    this.state = {
      attacker: null,
      victim: null,
      selecting: states.INITIAL_ASSIGN,
      dummy: 0,
    };
  }

  getTerritories() {
    return this.territories;
  }

  getInitialArmy() {
    return this.initialArmy;
  }

  componentWillMount() {
    this.distributeTerritories();
  }

  distributeTerritories() {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
    let allTerritories = [...this.territories];
    shuffleArray(allTerritories);
    for (let i = 0; i < allTerritories.length; i++) {
      if (i % 2) {
        allTerritories[i].setAgent(this.agent2);
        this.agent2.addTerritory(allTerritories[i]);
      } else {
        allTerritories[i].setAgent(this.agent1);
        this.agent1.addTerritory(allTerritories[i]);
      }
      allTerritories[i].addArmy(1);
    }
    this.agent1.setFreeArmies(initialArmy - this.agent1.getTerritoryCount());
    this.agent2.setFreeArmies(initialArmy - this.agent2.getTerritoryCount());
    this.turn = this.agent1;
    this.setState({
      dummy: this.state.dummy + 1,
    });
  }

  getTurn() {
    return this.state.turn;
  }

  // TODO add function in the abstract to indicate the end of the game
  endTurn() {
    //console.log("from end turn")
    this.turn.gameState = states.ASSIGN_ARMY;
    this.turn = this.turn.id === 1 ? this.agent2 : this.agent1;
    this.turn.calculateBonusArmy();
    this.turn.setDefendingTerritory(null);
    this.turn.setAttackingTerritory(null);
    //game ended ?
    if(this.turn.getTerritoryCount() === 0){
      gameEnded = true;
    }
  }

  //TODO make the agents in the attack mode till they
  // make a no attack step thats when u make the endturn here
  territorySelectHandler = (territory) => {
    let changeTurn = this.turn.updateState(territory);
    if (changeTurn && this.turn.gameState !== states.VICTIM) {
      this.endTurn();
    }
    this.setState(
      {
        dummy: this.state.dummy + 1,
      },
      () => {}
    );
  };

  getStateObject() {
    let agentId = this.turn.id;
    let territories = {};
    this.territories.forEach((t) => {
      let terr = {};
      let adj = [];
      t.getAdj().forEach((a) => {
        adj.push(a.name);
      });
      terr["adj"] = adj;
      terr["agent"] = t.agent.id;
      terr["army"] = t.army;
      territories[t.name] = terr;
    });
    return { agent: agentId, territories: territories };
  }

  render() {
    return (
      <div className={"gameContainer"}>
        <div className="egypt-map">
          {this.territories.map((t) => {
            let bg_color = t.getAgent().getId() === 1 ? "yellow" : "blue";
            bg_color =
              this.turn.getAttackingTerritory() === t
                ? "green"
                : this.turn.getDefendingTerritory() === t
                ? "red"
                : bg_color;

            return (
              <button
                className={"territoryBtn"}
                style={{
                  top: this.locations[t.name].y,
                  left: this.locations[t.name].x,
                  backgroundColor: bg_color,
                }}
                disabled={this.turn.name !== "Human" || gameEnded}
                onClick={() => this.territorySelectHandler(t)}
              >
                {t.army}
              </button>
            );
          })}
        </div>
        {
          <button
            className="button advance"
            onClick={() => this.territorySelectHandler(this.getStateObject())}
            disabled={this.turn.name === "Human" || gameEnded}
          >
            {this.turn.gameState === states.INITIAL_ASSIGN ||
            this.turn.gameState === states.ASSIGN_ARMY
              ? "Assign Army"
              : "attack"}
          </button>
        }
        {
          <button
            className="button endturn"
            disabled={
              this.turn.name !== "Human" ||
              this.turn.gameState === states.INITIAL_ASSIGN ||
              this.turn.gameState === states.ASSIGN_ARMY || gameEnded
            }
            onClick={() => {
              this.endTurn();
              this.setState({
                dummy: this.state.dummy + 1,
              });
            }}
          >
            {"End Turn"}
          </button>
        }
        <h3 className="game-state">
          {this.turn.name +
            " " +
            this.turn.getId() +
            " " +
            (
              gameEnded ? "Lost , Game Ended"
              :
              this.turn.gameState === states.INITIAL_ASSIGN
              ? `Assigning army to territory, remaining: ${this.turn.freeArmies}`
              : this.turn.gameState === states.ASSIGN_ARMY
              ? `Assigning army to territory, remaining: ${this.turn.freeArmies}`
              : this.turn.gameState === states.ATTACK
              ? `Attacking ${
                  this.turn.name === "Human"
                    ? "select your attacking territory"
                    : "press attack to procceed"
                }`
              : this.turn.gameState === states.VICTIM
              ? "Attacking, Select your victim"
              : null)}
        </h3>
      </div>
    );
  }
}
