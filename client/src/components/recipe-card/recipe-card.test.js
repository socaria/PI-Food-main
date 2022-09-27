import * as actions from '../../actions';
import * as data from "../../../../api/mock/search.json";

import { Link, MemoryRouter } from "react-router-dom";
import { configure, mount } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import RecipeCard from './RecipeCard';
import { Provider } from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });


describe("<RecipeCard />", () => {
  let recipeCard, state, store;
  const mockStore = configureStore([thunk]);
  let recipes = data.results;
  state = {
    recipes: [],
    recipeDetail: {},
  };
  store = mockStore(state);
  beforeEach(() => {
    recipeCard = (recipe) =>
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <RecipeCard
              id={recipe.id}
              title={recipe.title}
              diets={recipe.diets}
              healthScore={recipe.healthScore}
              image={recipe.image}
            />
          </MemoryRouter>
        </Provider>
      );
  });

  afterEach(() => jest.restoreAllMocks());

  describe("Estructura", () => {
    it('Debería renderizar un tag "h3" que muestre lo que contiene el "title" de cada "recipe"', () => {
      expect(recipeCard(recipes[0]).find("h3").at(0).text()).toBe("Cauliflower, Brown Rice, and Vegetable Fried Rice");
      expect(recipeCard(recipes[1]).find("h3").at(0).text()).toBe("Homemade Garlic and Basil French Fries");
      expect(recipeCard(recipes[2]).find("h3").at(0).text()).toBe("Berry Banana Breakfast Smoothie"
      );
    });

    it("Debería renderizar la imágen de cada recipe y un alt con el nombre del respectivo recipe", () => {
      expect(recipeCard(recipes[0]).find("img").prop("src")).toBe(
        recipes[0].image
      );
      expect(recipeCard(recipes[0]).find("img").prop("alt")).toBe(recipes[0].title);
      expect(recipeCard(recipes[1]).find("img").prop("src")).toBe(
        recipes[1].image
      );
      expect(recipeCard(recipes[1]).find("img").prop("alt")).toBe(recipes[1].title);
    });

    it('Debería renderizar un tag "div" que contenga la prop "healthScore" de cada "recipe"', () => {
      expect(recipeCard(recipes[0]).find("p").at(0).text()).toBe(
        "76"
      );
      expect(recipeCard(recipes[1]).find("p").at(0).text()).toBe(
        "77"
      );
      expect(recipeCard(recipes[2]).find("p").at(0).text()).toBe(
        "63"
      );
      expect(recipeCard(recipes[3]).find("p").at(0).text()).toBe(
        "92"
      );
    });

    it("Debería mapear la cantidad de diets que hayan en el store y renderizar un label por cada una", () => {

      expect(recipeCard(recipes[0]).find("label")).toHaveLength(5);
    });
   
    it('Debería renderizar un "label" con cada diet de la prop "diets" de cada "recipe"', () => {
      expect(recipeCard(recipes[0]).find(".recipe-card__diet-label")).toBe(
        "7s6");
      
      expect(recipeCard(recipes[1]).find("p").at(1).text()).toBe(
        "diets: Richard Linklater"
      );
      expect(recipeCard(recipes[2]).find("p").at(1).text()).toBe(
        "diets: Francis Ford Coppola"
      );
      expect(recipeCard(recipes[3]).find("p").at(1).text()).toBe(
        "diets: Ron Shelton"
      );
    });

    it('Debería renderizar un componente <Link> que encierre el "title" de cada "recipe" y debería redirigir a "/recipes/:id"', () => {
      expect(recipeCard(recipes[0]).find(Link)).toHaveLength(1);
      expect(recipeCard(recipes[0]).find(Link).at(0).prop("to")).toEqual(
        "/recipes/716426"
      );
    });
  });

  describe("Dispatch to store", () => {
  
    it("Debería hacer un dispatch al store utilizando la action 'deleterecipe' al hacer click en el boton previamente creado para poder eliminar una recipe. Debe pasarle el Id de la recipe", () => {
      const deleterecipeSpy = jest.spyOn(actions, "deleterecipe");
      const recipeCard = mount(
        <Provider store={store}>
          <MemoryRouter>
            <RecipeCard
              id={recipes[0].id}
              title={recipes[0].title}
              diets={recipes[0].diets}
              healthScore={recipes[0].healthScore}
            />
          </MemoryRouter>
        </Provider>
      );
      recipeCard.find("button").simulate("click");
      expect(deleterecipeSpy).toHaveBeenCalled();
      expect(deleterecipeSpy).toHaveBeenCalledWith(recipes[0].id);

      const recipeCard2 = mount(
        <Provider store={store}>
          <MemoryRouter>
            <RecipeCard
              id={recipes[1].id}
              title={recipes[1].title}
              diets={recipes[1].diets}
              healthScore={recipes[1].healthScore}
            />
          </MemoryRouter>
        </Provider>
      );
      recipeCard2.find("button").simulate("click");
      expect(deleterecipeSpy).toHaveBeenCalled();
      expect(deleterecipeSpy).toHaveBeenCalledWith(recipes[1].id);
    });
  });
});
