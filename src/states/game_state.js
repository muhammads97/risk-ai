import * as React from "react";
import "../App.css";
import egypt from "../egypt/egypt.png";

const states = {
  INITIAL_ASSIGN: "initialAssign",
  ATTACK: "attack",
  VICTIM: "victim",
  ASSIGN_ARMY: "assignArmy"

}
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
      selecting: states.INITIAL_ASSIGN,
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
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    let allTerritories = [...this.state.map.territories];
    shuffleArray(allTerritories)
    let agent1TerritoryCount = 0;
    for (let i = 0; i < allTerritories.length; i++) {
      if (i % 2) {
        allTerritories[i].setAgent(1);
      } else {
        allTerritories[i].setAgent(0);
        agent1TerritoryCount++;
      }
      allTerritories[i].addArmy(1);
    }
    this.agent1.totalTerrs = agent1TerritoryCount;
    this.agent2.totalTerrs = allTerritories.length - agent1TerritoryCount;
    

    this.setState({
      agent1_free_army: this.state.agent1_free_army - agent1TerritoryCount,
      agent2_free_army: this.state.agent2_free_army - allTerritories.length + agent1TerritoryCount,
    })
    
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
      //console.log(this.state.agent2_free_army) //prints 0
      //console.log(Math.floor(this.agent1.totalTerrs / 3)) //prints 4 
  }

  getTurn() {
    return this.state.turn;
    
  }
  endTurn() {
    let turn = this.state.turn == 0 ? 1 : 0;
    this.setState({ turn: turn },this.calculateArmy);
    this.setState({ selecting: states.ASSIGN_ARMY });
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
      this.endTurn()
      //console.log(this.state.agent1_free_army) //prints 0
      //console.log(this.state.agent2_free_army) //prints 0
    }
  }

  reduceFreeArmyCallBack() {
    console.log(this.state.agent1_free_army) //prints 0
    console.log(this.state.agent2_free_army) //prints 0
    
    //console.log(Math.floor(this.agent1.totalTerrs / 3)) //prints 4 
    if (this.state.agent1_free_army == 0 && this.state.turn == 0) {
      this.setState({ selecting: states.ATTACK });
    } else if (this.state.agent2_free_army == 0 && this.state.turn == 1) {
      this.setState({ selecting: states.ATTACK });
    }
  }
  //TODO nzbt 3dd el total territories after attack 
  render() {
    return (
      <div className={"gameContainer"}>
        {this.state.map.renderMap(
          (territory) => {
            if (this.state.selecting == states.ATTACK) {
              console.log("here")
              if (territory.getAgent() !== this.getTurn() || territory.getArmy() === 1
                || territory.getAdjEnemy().length === 0) {
                //alert 
                if (territory.getAgent() !== this.getTurn())
                {
                  console.log("here1")
                  console.log(this.getTurn())
                  console.log(territory.getAgent())

                }
                if (territory.getArmy() === 1)
                console.log("here2")
                if (territory.getAdjEnemy().length === 0)
                console.log("here3")
              } else {
                this.setState({ attacker: territory });
                this.setState({ selecting: states.VICTIM });
                console.log("heree")
              }

            } else if (this.state.selecting == states.VICTIM) {
              if (territory.getAgent() === this.getTurn() ||
                !this.state.attacker.getAdjTerritory(territory)) {
                //alert
              } else {
                if(this.turn === 0){
                  this.agent1.performAttack(this.state.attacker , territory);
                }else{
                  this.agent2.performAttack(this.state.attacker , territory);     
                }
                this.setState({ victim: territory },this.endTurn);
                
              }

            } else if (this.state.selecting == states.INITIAL_ASSIGN) {
              if (this.state.turn == territory.agent) {
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
            } else if (this.state.selecting == states.ASSIGN_ARMY) {
              if (territory.agent == this.state.turn) {
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
