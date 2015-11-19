import { createStore } from 'fluxury';
import { Map } from 'immutable';
import { LOAD_FILE, LOAD_FILE_DATA } from './FileActions';

var FileStore;

export default FileStore = createStore(
  'FileStore',
  Map(),
  function (state, action) {
    switch (action.type) {
      case LOAD_FILE:
      return state.set( action.data.name, Map({ name: action.data.name }) );
      case LOAD_FILE_DATA:
      return state.setIn( [action.data.file.name, 'content'], action.data.content );
      default:
      return state;
    }
  }, {
    getFiles: (state) => Object.keys(state.toJS()),
    getFileData: (state, file) => (state.getIn([file, 'content']) || [])
  });
