import * as React from "react";

export default class GameState extends React.Component {
  constructor(map, player1, player2) {
    this.map = map;
    this.player1 = player1;
    this.player2 = player2;

    this.state = {
      turn: 0,
      selectedTerritory: null,
      selecting: null,
    };
  }

  attack() {
    if (turn == 0) {
      this.player1.attack(this);
    } else {
      this.player2.attack(this);
    }
  }

  assignArmy() {
    if (turn == 0) {
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
    this.map.getTerritories().map((t) => {
      return (onclick) => {
        this.callback(t);
      };
    });
  }
}
