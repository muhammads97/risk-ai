import * as React from "react";
import egypt from "../egypt/egypt.png";
import "../App.css";
import EgyptTerritories from "../helper/EgyptTerritories";

const states = {
  INITIAL_ASSIGN: "initialAssign",
  ATTACK: "attack",
  VICTIM: "victim",
  ASSIGN_ARMY: "assignArmy",
};

const initialArmy = 20;

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
  endTurn() {
    this.turn.gameState = states.ASSIGN_ARMY;
    this.turn = this.turn.id === 1 ? this.agent2 : this.agent1;
    this.turn.setDefendingTerritory(null);
    this.turn.setAttackingTerritory(null);
  }
  //TODO make the endturn only when the user press endturn
  territorySelectHandler = (territory) => {
    let changeTurn = this.turn.updateState(territory);
    if (changeTurn) {
      this.endTurn();
    }
    this.setState(
      {
        dummy: this.state.dummy + 1,
      },
      () => {
        
      }
    );
  };

  

  
  render() {
    return (
      <div className={"gameContainer"}>
        <div className="map">
          {this.territories.map((t) => {
            let bg_color = t.getAgent().getId() == 1 ? "yellow" : "blue";
            bg_color =
              this.turn.getAttackingTerritory() === t ? "green" : bg_color;
            bg_color =
              this.turn.getDefendingTerritory() === t ? "red" : bg_color;

            return (
              <button
                className={"territoryBtn"}
                style={{
                  top: this.locations[t.name].y,
                  left: this.locations[t.name].x,
                  backgroundColor: bg_color,
                }}
                disabled={this.turn.name !== "Human"}
                onClick={() => this.territorySelectHandler(t)}
              >
                {t.army}
              </button>
            );
          })}
        </div>
        {this.turn.name !== "Human" && (
          <button className="button advance" onClick={() => this.territorySelectHandler(null)}>
            {this.turn.gameState == states.INITIAL_ASSIGN ||
            this.turn.gameState == states.ASSIGN_ARMY
              ? "Assign Army"
              : "attack"}
          </button>
        )}
        {this.turn.name === "Human" && this.turn.gameState !== states.INITIAL_ASSIGN 
         && this.turn.gameState !== states.ASSIGN_ARMY && (
          <button className="button endturn" onClick={() => this.endTurn()}>
            {"End Turn"}
          </button>
        )}
        <h3 className="game-state">
          {this.turn.name +
            " " +
            this.turn.getId() +
            " " +
            (this.turn.gameState == states.INITIAL_ASSIGN
              ? `Assigning army to territory, remaining: ${this.turn.freeArmies}`
              : this.turn.gameState == states.ASSIGN_ARMY
              ? `Assigning army to territory, remaining: ${this.turn.freeArmies}`
              : this.turn.gameState == states.ATTACK
              ? `Attacking ${
                  this.turn.name == "Human"
                    ? "select your attacking territory"
                    : "press attack to procceed"
                }`
              : this.turn.gameState == states.VICTIM
              ? "Attacking, Select your victim"
              : null)}
        </h3>
      </div>
    );
  }
}
