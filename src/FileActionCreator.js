import { dispatch } from 'fluxury';
import { LOAD_FILE_DATA, LOAD_FILE } from './FileActions'

/* Create semantic methods called action creators */

function loadFile(file) {

  dispatch(LOAD_FILE, file);

  var r = new FileReader();

  r.onload = function(e) {
    dispatch(LOAD_FILE_DATA, {
      file: file,
      content: e.target.result
    });
  };

  r.readAsText(file);
}

export default {
  loadFile
}
