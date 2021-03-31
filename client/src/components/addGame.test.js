import React from 'react';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { configure } from 'enzyme';
import { render } from '@testing-library/react';
import Form, {validate}  from './addGame.jsx';



describe('<Form />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = shallow(<Form />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });




  describe('Estados: ', () => {
    it('El form deberia cambiar de estado cuando escriban en el input del nombre del juego', 
    () => {
      wrapper.find('input[name="name"]').simulate('change', {target: {name: 'name', value: 'My new value'}});
      expect(setState).toHaveBeenCalledWith({"name": "My new value", "description": "", "launch": "","rating": "",
      "genres": "","plataforms": "",});
    });
    it('El form deberia cambiar de estado cuando escriban en el input de la descripcion del juego', () => {
        wrapper.find('input[name="name"]').simulate('change', {target: {name: 'description', value: 'My new value'}});
        expect(setState).toHaveBeenCalledWith({"name": "", "description": "My new value", "launch": "","rating": "",
        "genres": "","plataforms": "",});
      });
      it('El form deberia cambiar de estado cuando escriban en el input del la fecha de lanzamiento', () => {
        wrapper.find('input[name="name"]').simulate('change', {target: {name: 'launch', value: 'My new value'}});
        expect(setState).toHaveBeenCalledWith({"name": "", "description": "", "launch": "My new value","rating": "",
        "genres": "","plataforms": "",});
      });
      it('El form deberia cambiar de estado cuando escriban en el input del nombre del rating', () => {
        wrapper.find('input[name="name"]').simulate('change', {target: {name: 'rating', value: 'My new value'}});
        expect(setState).toHaveBeenCalledWith({"name": "", "description": "", "launch": "","rating": "My new value",
        "genres": "","plataforms": "",});
      });
      it('El form deberia cambiar de estado cuando seleccionen un genero', () => {
        wrapper.find('input[name="name"]').simulate('change', {target: {name: 'genres', value: 'My new value'}});
        expect(setState).toHaveBeenCalledWith({"name": "", "description": "", "launch": "","rating": "",
        "genres": "My new value","plataforms": "",});
      });
      it('El form deberia cambiar de estado cuando seleccionen una plataforma', () => {
        wrapper.find('input[name="name"]').simulate('change', {target: {name: 'plataforms', value: 'My new value'}});
        expect(setState).toHaveBeenCalledWith({"name": "", "description": "", "launch": "","rating": "",
        "genres": "","plataforms": "My new value",});
    });
  });

  describe('Validacion: ', () => {
    it('validate debe devolver un objeto con un error si se deja el campo de nombre vacío:', () => {
      expect(validate({
        name: '',
        description: 'hola1'
      })).toEqual({name: 'The name of the game is required'});
    });
    it('validate debe devolver un objeto con un error si la descripcion no contiene nada:', () => {
      expect(validate({
        name: 'ploksa',
        description: '',
      })).toEqual({description: 'Description is required'});
    });
    it('validate debe devolver un objeto con un error si no se selecciona ninguna plataforma:', () => {
      expect(validate({
        name: 'Babaganga',
        description: 'dassadas',
        plataforms:""
      })).toEqual({plataforms: 'You must select at least one platform'});
    });
  });
});

