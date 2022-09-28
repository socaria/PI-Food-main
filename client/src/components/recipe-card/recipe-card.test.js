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

    it("Debería mapear la cantidad de diets que haya en el store y renderizar un label por cada una", () => {

      expect(recipeCard(recipes[0]).find("label")).toHaveLength(4);
      expect(recipeCard(recipes[1]).find("label")).toHaveLength(3);
      expect(recipeCard(recipes[2]).find("label")).toHaveLength(1);
      expect(recipeCard(recipes[3]).find("label")).toHaveLength(7);
    });
   
    

    it('Debería renderizar un componente <Link> que encierre el "title" de cada "recipe" y debería redirigir a "/recipes/:id"', () => {
      expect(recipeCard(recipes[0]).find(Link)).toHaveLength(1);
      expect(recipeCard(recipes[0]).find(Link).at(0).prop("to")).toEqual(
        "/recipes/716426"
      );
    });
  });

});
