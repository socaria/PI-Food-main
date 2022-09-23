import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (

    <div>
      <Switch>
        
        <Route exact path="/" component={LandingPage} />     
        <Route exact path="/home" component={Home} />
        <Route path="/recipes/create" component={CreateRecipe} />
        <Route path="/recipes/:id" component={RecipeDetail} />
        <Redirect path='*' to='/home'/>
      </Switch>
    </div>

  );
}

export default App;
