import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import Home from './components/home/Home';
import CreateRecipe from './components/create-recipe/CreateRecipe';
import RecipeDetail from './components/recipe-detail/RecipeDetail';
import EditRecipe from './components/edit-recipe/EditRecipe';

function App() {
  return (

    <div className='App'>
      <Switch>
        
        <Route exact path="/" component={LandingPage} />     
        <Route exact path="/home" component={Home} />
        <Route path="/recipes/create" component={CreateRecipe} />
        <Route path="/recipes/edit/:id" component={EditRecipe} />
        <Route path="/recipes/:id" component={RecipeDetail} />
        <Redirect path='*' to='/home'/>
      </Switch>
    </div>

  );
}

export default App;
