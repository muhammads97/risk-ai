import * as React from "react";
import "../App.css";
import egypt from "../egypt/egypt.png";

const initialArmy = 20;
// states: initialAssign, assign, attack, victim
export default class GameState extends React.Component {
  constructor(props) {
    super(props);
    this.agent1 = props.agent1;
    this.agent2 = props.agent2;

    this.state = {
      turn: 0,
      attacker: null,
      victim: null,
      selecting: "initialAssign",
      map: props.map,
      agent1_free_army: initialArmy,
      agent2_free_army: initialArmy,
    };
  }

  componentDidMount() {
    this.distributeTerritories();
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

  distributeTerritories() {
    //randomly assign territories to players
    //add one army to each territory and set the remaining free army in the state
  }

  calculateArmy() {
    if (this.state.turn == 0)
      this.setState({
        agent1_free_army: Math.floor(this.agent1.totalTerrs / 3),
      });
    else
      this.setState({
        agent2_free_army: Math.floor(this.agent2.totalTerrs / 3),
      });
  }

  getTurn() {
    return this.tassignArmyurn;
  }
  endTurn() {
    let turn = this.state.turn == 0 ? 1 : 0;
    this.setState({ turn: turn });
    this.calculateArmy();
    this.setState({selecting: "assignArmy"});
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

  reduceFreeArmyCallBackInitial() {
    if (this.state.agent1_free_army == 0 && this.state.turn == 0) {
      this.setState({ turn: 1 });
    } else if (this.state.agent2_free_army == 0 && this.state.turn == 1) {
      this.setState({ turn: 0 });
      this.setState({ selecting: "assignArmy" });
      this.calculateArmy();
    }
  }

  reduceFreeArmyCallBack() {
    if (this.state.agent1_free_army == 0 && this.state.turn == 0) {
      this.setState({ selecting: "attack" });
    } else if (this.state.agent2_free_army == 0 && this.state.turn == 1) {
      this.setState({ selecting: "attack" });
    }
  }

  render() {
    return (
      <div className={"gameContainer"}>
        {this.state.map.renderMap(
          (territory) => {
            if (this.state.selecting == "attack") {
              this.setState({ attacker: territory });
              this.callback(territory);
            } else if (this.state.selecting == "victim") {
              this.setState({ victim: territory });
              this.callback(territory);
            } else if (this.state.selecting == "initialAssign") {
              if (this.state.turn == territory.player) {
                territory.addArmy(1);
                if (this.state.turn == 0)
                  this.setState(
                    { agent1_free_army: this.state.agent1_free_army - 1 },
                    this.reduceFreeArmyCallBackInitial
                  );
                else
                  this.setState(
                    { agent2_free_army: this.state.agent2_free_army - 1 },
                    this.reduceFreeArmyCallBackInitial
                  );
              } else {
                //alert not your t.
              }
            } else if (this.state.selecting == "assignArmy") {
              if (territory.player == this.state.turn) {
                territory.addArmy(1);
                if (this.state.turn == 0)
                  this.setState(
                    { agent1_free_army: this.state.agent1_free_army - 1 },
                    this.reduceFreeArmyCallBack
                  );
                else
                  this.setState(
                    { agent2_free_army: this.state.agent2_free_army - 1 },
                    this.reduceFreeArmyCallBack
                  );
              }
            }
          },
          this.state.selecting,
          this.state.attacker,
          this.state.victim
        )}
      </div>
    );
  }
}
