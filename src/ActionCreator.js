import Dispatcher from './AppDispatcher';
import {MaxRows} from './Constants';
import {csv} from 'd3-dsv';
import { LOAD_DATA, LOAD_FILE } from './ActionTypes'

export default class {
  static loadFile(file) {
    Dispatcher.dispatch({
      type: LOAD_FILE,
      file: file
    });

    var r = new FileReader();
    var self = this;

    r.onload = function(e) {
      self.loadFileData( file, csv.parse(e.target.result, (d, i) => {
        if (i > MaxRows) { return undefined; }
        return d;
      }));

    };

    r.readAsText(file);
  }

  static loadFileData(file, data) {
    Dispatcher.dispatch({
      type: LOAD_DATA,
      file: file,
      data: data
    });
  }

};
