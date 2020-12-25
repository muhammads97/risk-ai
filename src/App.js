import "./App.css";
import * as React from "react";
import EgyptMap from "./maps/EgyptMap";
import USMap from "./maps/USMap";
import HumanAgent from "./agents/HumanAgent";
import Passive from "./agents/Passive";
import Aggressive from "./agents/aggressive";
import pacifist from "./agents/pacifist";

function App() {
    const Maps = {
        EGYPT: "egypt",
        USA: "usa"
    }
    const [map, setMap] = React.useState(null);
    const [agent1, setAgent1] = React.useState(null);
    const [agent2, setAgent2] = React.useState(null);

    console.log(map);

    const chooseMap = () => {
        return (
            <div className="row">
                <button className="button" onClick={() => setMap(Maps.EGYPT)}>
                    Egypt
                </button>
                <button className="button" onClick={() => setMap(Maps.USA)}>
                    USA
                </button>
            </div>);
    }
    const chooseAgentType = (agent) => {
        return (
            <div className="col">
                <h1>select agent {agent + 1}</h1>
                <div className="row">
                    <div className="col">
                        <button
                            className="agentButton"
                            onClick={() => (agent === 0 ? setAgent1(new HumanAgent(1, "Human"))
                                : setAgent2(new HumanAgent(2, "Human")))}
                        >
                            Human
                        </button>
                        <button
                            className="agentButton"
                            onClick={() => (agent === 0 ? setAgent1(new Passive(1, "Passive"))
                                : setAgent2(new Passive(2, "Passive")))}
                        >
                            Passive
                        </button>
                        <button
                            className="agentButton"
                            onClick={() => (agent === 0 ? setAgent1(new Aggressive(1, "Aggressive"))
                                : setAgent2(new Aggressive(2, "Aggressive")))}
                        >
                            Aggressive
                        </button>
                        <button className="agentButton"
                                onClick={() => (agent === 0 ? setAgent1(new pacifist(1, "pacifist"))
                                    : setAgent2(new pacifist(2, "pacifist")))}
                        >
                            pacifist
                        </button>
                    </div>
                    <div className="col">
                        <button className="agentButton">greedy</button>
                        <button className="agentButton"> A* search</button>
                        <button className="agentButton"> real-time A*</button>
                        <button className="agentButton">alpha-beta pruning</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="App">
            <div className="App-body">
                {map == null ? (
                    chooseMap()
                ) : agent1 == null ? (
                    chooseAgentType(0)
                ) : agent2 == null ? (
                        chooseAgentType(1)
                    ) :
                    (map === Maps.EGYPT ?
                            <EgyptMap agent1={agent1} agent2={agent2}/> :
                            <USMap agent1={agent1} agent2={agent2}/>
                    )
                }
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
