import Dispatcher from './AppDispatcher';
import {MaxRows} from './Constants';
import {csv} from 'd3-dsv';
import { LOAD_FILE_DATA, LOAD_FILE } from './ActionTypes'

export default class {
  static loadFile(file) {
    Dispatcher.dispatch({
      type: LOAD_FILE,
      file: file
    });
  }

  static loadFileData(file, data) {
    Dispatcher.dispatch({
      type: LOAD_FILE_DATA,
      file: file,
      data: data
    });
  }

  static error(err) {
    Dispatcher.dispatch({
      type: ERROR,
      error: err
    })
  }

};
