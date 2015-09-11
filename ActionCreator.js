var Dispatcher = require('./Dispatcher');

export default {
  parseFile: function(file) {
    Dispatcher.dispatch({
      type: 'PARSE_FILE',
      file: file
    });
  },

  error: function(error){
    console.log(error); // not for production
  }
};
