import * as React from "react";
import egypt from "../egypt/egypt.png";
import "../App.css";
import EgyptTerritories from '../helper/EgyptTerritories'

const states = {
  INITIAL_ASSIGN: "initialAssign",
  ATTACK: "attack",
  VICTIM: "victim",
  ASSIGN_ARMY: "assignArmy"
}

const initialArmy = 20;
// states: initialAssign, assign, attack, victim
export default class EgyptMap extends React.Component {
  constructor(props) {
    super(props);
    let egyptTerritories = new EgyptTerritories()
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
      dummy: 0
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
    }
    let allTerritories = [...this.territories];
    shuffleArray(allTerritories)
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
    this.turn = this.agent1
    this.setState({
      dummy: this.state.dummy + 1
    })
  
  }



  getTurn() {
    return this.state.turn;
  }
  endTurn() {
    this.turn = (this.turn.id === 1 ? this.agent2 : this.agent1)
    this.turn.setDefendingTerritory(null);
    this.turn.setAttackingTerritory(null);
  }

  territorySelectHandler = (territory) => {
    let changeTurn = this.turn.updateState(territory)
    this.setState({
      dummy: this.state.dummy + 1
    },
    ()=>{
      if (changeTurn) {
        this.endTurn()
      } 
    })
  }
  //TODO nzbt 3dd el total territories after attack 
  render() {
    return (
      <div className={"gameContainer"}>
        <div className="map">
          {this.territories.map((t) => {
             let bg_color = t.getAgent().getId() == 1 ? "yellow" : "blue";
             bg_color = this.turn.getAttackingTerritory() === t ? "green": bg_color;
             bg_color = this.turn.getDefendingTerritory() === t ? "red": bg_color;
            // let bg_color =
            //   this.state.selecting == "initialAssign"
            //     ? "turquoise"
            //     : this.state.attacker && t.name == this.state.attacker.name
            //       ? "green"
            //       : this.state.victim && t.name == this.state.victim.name
            //         ? "red"
            //         : t.player != null
            //           ? t.player.color
            //           : "turquoise";
            return (
              <button
                className={"territoryBtn"}
                style={{
                  top: this.locations[t.name].y,
                  left: this.locations[t.name].x,
                  backgroundColor: bg_color,
                }}
                disabled={!this.state.selecting}
                onClick={() =>
                  this.territorySelectHandler(t)}
              >
                {t.army}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

}








