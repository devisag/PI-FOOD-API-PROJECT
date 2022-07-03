import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./components/home/Home";
import LandingPage from "./components/LandingPage/Landing";
import RecipeDetails from "./components/recipeDetail/RecipeDetails";
import NotFound from "./components/notFound/NotFound";
import Form from "./components/Form/Form";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route exact path="/home" >
            <Home />
          </Route>
          <Route exact path="/home/:id">
            <RecipeDetails/>
          </Route>
          <Route exact path="/createrecipe">
            <Form/>
          </Route>
          <Route path="*" >
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
