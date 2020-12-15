import * as React from "react";
import "../App.css";

export default class GameState extends React.Component {
  constructor(props) {
    super(props);
    this.player1 = props.player1;
    this.player2 = props.player2;

    this.state = {
      turn: 0,
      selectedTerritory: null,
      selecting: null,
      map: props.map,
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  attack() {
    if (this.state.turn == 0) {
      this.player1.attack(this);
    } else {
      this.player2.attack(this);
    }
  }

  assignArmy() {
    if (this.state.turn == 0) {
      this.player1.assignArmy(this);
    } else {
      this.player2.assignArmy(this);
    }
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
  getMap() {}

  setMap(map) {}

  render() {
    return (
      <div className={"gameContainer"}>
        <button>MuhammadS</button>
      </div>
    );
  }
}
