import Navbar from "../components/Navbar";
import Fragmanlar from "../components/Fragmanlar";
import Dizigrid from "../components/Dizigrid";
import Editor from "../components/Editorspick";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Discover from "../components/Navbar/Discover";
import Trends from "../components/Navbar/Trends";
import Calendar from "../components/Navbar/Calendar";
import Allseries from "../components/Navbar/Allseries";
import Collections from "../components/Navbar/Collections";
import Watchtogether from "../components/Navbar/Watchtogether";
import Dizisezon from "../components/Dizisezon";
import Dizi from "../components/Dizi";
import Dizibolum from "../components/Dizibolum";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Fragmanlar />
            <Dizigrid />
            <Editor />
          </Route>
          <Route exact path='/discover'>
            <Discover />
          </Route>

          <Route exact path='/trends'>
            <Trends />
          </Route>

          <Route exact path='/calendar'>
            <Calendar />
          </Route>

          <Route exact path='/allseries'>
            <Allseries />
          </Route>

          <Route exact path='/collections'>
            <Collections />
          </Route>

          <Route exact path='/w2g'>
            <Watchtogether />
          </Route>

          <Route exact path={`/:tmdbid`}>
            <Dizi />
          </Route>

          <Route exact path={`/:tmdbid/:season`}>
            <Dizisezon />
          </Route>

          <Route path={`/:tmdbid/:season/:episode`}>
            <Dizibolum />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
