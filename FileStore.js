var EventEmitter = require('events');
var Papa = require('papaparse');
var Dispatcher = require('./Dispatcher');

let _instance,
    _state = { files: [] };

class FileStore extends EventEmitter {

  constructor() {
    super();
    this.dispatchToken = Dispatcher.register((action) => {
      var file = action.file;

      switch (action.type) {
        case 'PARSE_FILE':

        switch (file.type) {
         case "text/csv":
         break;
         default:
         ActionCreator.error("Couldn't recognize the file type");
         return;
       }

        var _file = {
          name: file.name,
          data: [[]]
        };

        _state.files.push(_file);
        this.emit('change')

        var self = this;

        Papa.parse(file, {
          complete: function(results) {
            if (results.errors.length > 0) {
              ActionCreator.error(results.errors);
            } else {
              _file.data = results.data;
              console.log(_file)
              self.emit('change');
            }
          }
        });
        break;
      }
    });

  }

  getFiles() {
    return _state.files;
  }

}

_instance = new FileStore();
export default _instance;
