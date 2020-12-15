import * as React from "react";
import "../App.css";
import egypt from "../egypt/egypt.png";

export default class GameState extends React.Component {
  constructor(props) {
    super(props);
    this.agent1 = props.agent1;
    this.agent2 = props.agent2;

    this.state = {
      turn: 0,
      attacker: null,
      victim: null,
      selecting: null,
      map: props.map,
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  attack() {
    if (this.state.turn == 0) {
      this.agent1.attack(this);
    } else {
      this.agent2.attack(this);
    }
  }

  assignArmy() {
    if (this.state.turn == 0) {
      this.agent1.assignArmy(this);
    } else {
      this.agent2.assignArmy(this);
    }
  }
  getTurn(){
    return this.tassignArmyurn;
  }
  endTurn() {
    let turn = this.state.turn == 0 ? 1 : 0;
    this.setState({ turn: turn });
    this.assignArmy();
  }

  selectTerritory(type, callback) {
    this.setState({ selecting: type });
    this.callback = callback;
  }
  getMap() {
    return this.state.map;
  }

  setMap(map) {
    this.setState({ map });
  }

  render() {
    return (
      <div className={"gameContainer"}>
        {this.state.map.renderMap(
          (territory) => {
            if (this.state.selecting == "attack") {
              this.setState({ attacker: territory });
            } else {
              this.setState({ victim: territory });
            }
            this.callback(territory);
          },
          this.state.selecting,
          this.state.attacker,
          this.state.victim
        )}
      </div>
    );
  }
}
