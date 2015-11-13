import Fluxury from 'fluxury';
import { LOAD_FILE_DATA, LOAD_FILE } from './FileActions'

/* Create semantic methods called action creators */

function loadFile(file) {

  Fluxury.dispatch(LOAD_FILE, file);

  var r = new FileReader();

  r.onload = function(e) {
    Fluxury.dispatch(LOAD_FILE_DATA, {
      file: file,
      content: e.target.result
    });
  };

  r.readAsText(file);
}

export default {
  loadFile
}