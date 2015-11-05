import Dispatcher from './AppDispatcher';
import {MapStore} from 'flux/utils';
import { LOAD_FILE_DATA, LOAD_FILE } from './ActionTypes'
import {csv} from 'd3-dsv';

class FileStore extends MapStore {

  constructor() {
    super(Dispatcher);
  }

  reduce(state, action) {
    var file = action.file;

    switch (action.type) {
      case LOAD_FILE:
      return state.set( file.name, file);
      case LOAD_FILE_DATA:
      switch (file.type) {
        case 'text/csv':
        return state.set( file.name + '-data', csv.parse(action.data) );
        default:
        return state.set( file.name + '-data', action.data);
      }
    }
  }

  getFiles() {
    return this.getState().toArray()
  }

  getFileData(name) {
    return this.getState().get( name + '-data');
  }

}

export default new FileStore()
