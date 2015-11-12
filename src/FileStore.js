import Fluxury from 'fluxury';
import Immutable from 'immutable';
import { LOAD_FILE, LOAD_FILE_DATA } from './FileActions';

var FileStore;

export default FileStore = Fluxury.createStore(
  'FileStore',
  Immutable.Map(),
  function (state, action) {
    switch (action.type) {
      case LOAD_FILE:
      return state.set( action.data.name, Immutable.Map({ name: action.data.name }) );
      case LOAD_FILE_DATA:
      return state.setIn( [action.data.file.name, 'content'], action.data.content );
      default:
      return state;
    }
  });
