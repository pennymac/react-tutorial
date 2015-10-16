var EventEmitter = require('events');
var Dispatcher = require('./Dispatcher');
var {csv} = require('d3-dsv');

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
          data: []
        };

        _state.files.push(_file);
        this.emit('change')

        var self = this;

        var r = new FileReader();

        r.onload = function(e) {
            _file.data  = csv.parseRows(e.target.result, (d, i) => {
              if (i > 500) { return undefined; }
              return d;
            });

            console.log(_file)
            self.emit('change');
        };

        r.readAsText(file);

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
