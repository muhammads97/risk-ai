import logo from "./logo.svg";
import "./App.css";
import MapEgypt from "./maps/map";

function App() {
  const [turn, setTurn] = React.useState(0);

  let egypt = new MapEgypt();
  egypt.territories[0]
    .getAdjTerritory("Suez")
    .getAdjTerritory("Giza")
    .getAdjTerritory("New Valley")
    .getAdj()
    .forEach((t) => {
      console.log(t.name);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
