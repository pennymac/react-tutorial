import Dispatcher from './AppDispatcher';
import {MapStore} from 'flux/utils';

// the private singleton instance
let _instance;

class FileStore extends MapStore {

  constructor() {
    super(Dispatcher);
  }

  reduce(state, action) {
    var file = action.file;

    switch (action.type) {
      case 'LOAD_FILE':

        switch (file.type) {
          case "text/csv":
            break;
          default:
            ActionCreator.error("Couldn't recognize the file type");
            return;
        }

        return state.set( file.name, file);
      case 'LOAD_FILE_DATA':
        return state.set( file.name + '-data', action.data);
      default:
        return state;
    }
  }

  getFiles() {
    return this.getState().toArray() 
  }

  getFileData(name) {
    return this.getState().get( name + '-data');
  }

}

_instance = new FileStore();
export default _instance;
