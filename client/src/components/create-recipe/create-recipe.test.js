import * as actions from '../../actions';
import * as data from "../../../../api/mock/search.json";

import { configure, mount } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import CreateRecipe from "./CreateRecipe";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import isReact from "is-react";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

jest.mock('../../actions/index', () => ({
  CREATE_RECIPE: "CREATE_RECIPE",
  createRecipe: (payload) => ({
    type: 'CREATE_RECIPE',
    payload: {
      ...payload,
      id: 6
    }
  })
}))

describe("<CreateRecipe/>", () => {
  const state = { recipes: data.results };
  const mockStore = configureStore([thunk]);
  const { CREATE_RECIPE } = actions;

   
  describe("Formulario de creación de receta", () => {
    let createRecipe;
    let store = mockStore(state);
    beforeEach(() => {
      createRecipe = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/recipes/create"]}>
            <CreateRecipe />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debe renderizar un formulario", () => {
      expect(createRecipe.find("form").length).toBe(1);
    });

    it('Debe renderizar un label para el nombre con el texto "Name: "', () => {
      expect(createRecipe.find("label").at(0).text()).toEqual("Name: ");
    });

    it('Debe renderizar un input de tipo text para con la propiedad "name" igual a "name"', () => {
      expect(createRecipe.find('input[name="name"]').length).toBe(1);
    });

    it('Debe renderizar un label para el año de lanzamiento con el texto "ReleaseYear:', () => {
      expect(createRecipe.find("label").at(1).text()).toBe("ReleaseYear: ");
    });

    it('Debe renderizar un input de tipo number para con la propiedad "name" igual a "releaseYear"', () => {
      expect(createRecipe.find('input[name="releaseYear"]').length).toBe(1);
      expect(createRecipe.find('input[type="number"]').length).toBe(1);
    });
    it('Debe renderizar un label para la descripción con el texto "Description:', () => {
      expect(createRecipe.find("label").at(2).text()).toBe("Description: ");
    });
    it('Debe renderizar un textarea con la propiedad name igual a "description"', () => {
      expect(createRecipe.find('textarea[name="description"]').length).toBe(1);
    });

    it('Debe renderizar in label para el director con el texto "Director: "', () => {
      expect(createRecipe.find("label").at(3).text()).toEqual("Director: ");
    });
    it('Debe renderizar un input de tipo text para con la propiedad "name" igual a "director', () => {
      expect(createRecipe.find('input[name="director"]').length).toBe(1);
      expect(createRecipe.find('input[type="text"]').length).toBe(2);
    });

    it('Debería renderizar un input de button submit y con texto "Create Movie"', () => {
      expect(createRecipe.find('button[type="submit"]').length).toBe(1);
      expect(createRecipe.find('button[type="submit"]').text()).toBe(
        "Create Movie"
      );
    });
  });

  describe("Manejo de estados locales", () => {
    let useState, useStateSpy, createRecipe;
    let store = mockStore(state);
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((initialState) => [
        initialState,
        useState,
      ]);

      createRecipe = mount(
        <Provider store={store}>
          <CreateRecipe />
        </Provider>
      );
    });

    // Revisen bien que tipo de dato utilizamos en cada propiedad.
    it("Deberia inicializar de forma correcta los valores del useState", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name: "",
        releaseYear: 0,
        description: "",
        director: "",
      });
    });

    describe("Name input", () => {
      it('Debe reconocer cuando hay un cambio en el valor del input "name"', () => {
        createRecipe.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "El gladiador" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "El gladiador",
          releaseYear: 0,
          description: "",
          director: "",
        });

        createRecipe.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "Candy man" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "Candy man",
          releaseYear: 0,
          description: "",
          director: "",
        });
      });
    });

    describe("ReleaseYear input", () => {
      it('Debe reconocer cuando hay un cambio en el valor del input "releaseYear"', () => {
        createRecipe.find('input[name="releaseYear"]').simulate("change", {
          target: { name: "releaseYear", value: 100 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          releaseYear: 100,
          description: "",
          director: "",
        });

        createRecipe.find('input[name="releaseYear"]').simulate("change", {
          target: { name: "releaseYear", value: 200 },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          releaseYear: 200,
          description: "",
          director: "",
        });
      });
    });

    describe("Description input", () => {
      it('Debe reconocer cuando hay un cambio en el valor del input "description"', () => {
        createRecipe.find('textarea[name="description"]').simulate("change", {
          target: { name: "description", value: "Descripcion" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          releaseYear: 0,
          description: "Descripcion",
          director: "",
        });

        createRecipe.find('textarea[name="description"]').simulate("change", {
          target: { name: "description", value: "Descripcion 2" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          releaseYear: 0,
          description: "Descripcion 2",
          director: "",
        });
      });
    });

    describe("Director input", () => {
      it('Debe reconocer cuando hay un cambio en el valor del input "director"', () => {
        createRecipe.find('input[name="director"]').simulate("change", {
          target: { name: "director", value: "lucas film" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          releaseYear: 0,
          description: "",
          director: "lucas film",
        });

        createRecipe.find('input[name="director"]').simulate("change", {
          target: { name: "director", value: "tom cruise" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          releaseYear: 0,
          description: "",
          director: "tom cruise",
        });
      });
    });
  });

  describe("Dispatch al store", () => {
    // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
    // import * as actions from "./../../redux/actions/index";

    let createRecipe, useState, useStateSpy;
    let store = mockStore(state);

    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((initialState) => [
        initialState,
        useState,
      ]);
      store = mockStore(state, actions.createRecipe);
      store.clearActions();
      createRecipe = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/recipes/create"]}>
            <CreateRecipe />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => jest.restoreAllMocks());

    it("Debe disparar la acción createRecipe con los datos del state cuando se haga submit del form.", () => {
      const createRecipeFn = jest.spyOn(actions, "createRecipe");
      createRecipe.find("form").simulate("submit");
      expect(store.getActions()).toEqual([
        {
          type: CREATE_RECIPE,
          payload: {
            name: "",
            releaseYear: 0,
            description: "",
            director: "",
            id: 6,
          },
        },
      ]);
      expect(CreateRecipe.toString().includes("useDispatch")).toBe(true);
      expect(createRecipeFn).toHaveBeenCalled();
    });

    it('Debe evitar que se refresque la página luego de hacer submit con el uso del evento "preventDefault"', () => {
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      createRecipe.find("form").simulate("submit", event);
      expect(event.preventDefault).toBeCalled();
    });
  });
});
