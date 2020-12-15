import "./App.css";
import * as React from "react";
import MapEgypt from "./maps/mapEgypt";
import HumanAgent from "./agents/human";
import GameState from "./states/game_state";

function App() {
  const [map, setMap] = React.useState(null);
  const [agent1, setAgent1] = React.useState(null);
  const [agent2, setAgent2] = React.useState(null);

  console.log(map);

  return (
    <div className="App">
      <div className="App-body">
        {map == null ? (
          <div className="row">
            <button className="button" onClick={() => setMap(new MapEgypt())}>
              Egypt
            </button>
            <button className="button">USA</button>
          </div>
        ) : agent1 == null ? (
          <div className="col">
            <h1>select agent 1</h1>
            <div className="row">
              <div className="col">
                <button
                  className="agentButton"
                  onClick={() => setAgent1(new HumanAgent())}
                >
                  Human
                </button>
                <button className="agentButton">Passive</button>
                <button className="agentButton">Aggressive</button>
                <button className="agentButton">pacifist</button>
              </div>
              <div className="col">
                <button className="agentButton">greedy</button>
                <button className="agentButton"> A* search</button>
                <button className="agentButton"> real-time A*</button>
                <button className="agentButton">alpha-beta pruning</button>
              </div>
            </div>
          </div>
        ) : agent2 == null ? (
          <div className="col">
            <h1>select agent 2</h1>
            <div className="row">
              <div className="col">
                <button
                  className="agentButton"
                  onClick={() => setAgent2(new HumanAgent())}
                >
                  Human
                </button>
                <button className="agentButton">Passive</button>
                <button className="agentButton">Aggressive</button>
                <button className="agentButton">pacifist</button>
              </div>
              <div className="col">
                <button className="agentButton">greedy</button>
                <button className="agentButton"> A* search</button>
                <button className="agentButton"> real-time A*</button>
                <button className="agentButton">alpha-beta pruning</button>
              </div>
            </div>
          </div>
        ) : (
          <GameState map={map} player1={agent1} player2={agent2} />
        )}
      </div>
    </div>
  );
}

export default App;

// choose map
// choose agent 1
// choose agent 2

// show map, distribute army
// agent 1 distribute remaining army
// agent 1 distribute remaining army
// turn 1 => player 1 (rec t/3 army)
// 1 addign armys
// perform attacks
// end
