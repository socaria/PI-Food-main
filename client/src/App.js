import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';
import Navbar from './components/Navbar';

function App() {
  return (

    <div>
      <Switch>
        
        <Route exact path="/" component={LandingPage} />
        {/* <Navbar/> */}
        <Route exact path="/home" component={Home} />
        <Route path="/recipes/create" component={CreateRecipe} />
        <Route path="/recipes/:id" component={RecipeDetail} />
      </Switch>
    </div>

  );
}

export default App;
