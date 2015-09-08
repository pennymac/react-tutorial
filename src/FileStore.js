var EventEmitter = require('fbemitter').EventEmitter;
var Constants = require('./AppConstants');
var AppDispatcher = require('./AppDispatcher');
var Papa = require('papaparse');
var assign = require('object-assign');

var PARSE_COMPLETE = 'parse_complete';
var PARSE_ERROR = 'parse_error';

var FileStore = assign(EventEmitter.prototype, new EventEmitter(), {
    parse: function(file, complete) {
	Papa.parse(file, {
	    complete: complete
	});
    },

    addParseListener: function(callback) {
	this.addListener(PARSE_COMPLETE, callback);
    },

    onParseComplete: function(results) {
	if (results.errors.length > 0) {
	    this.emit(PARSE_ERROR, results.errors);
	} else {
	    this.emit(PARSE_COMPLETE, results.data);
	}
    }
});

AppDispatcher.register(function(action) {
    console.log("The action is: " + action.actionType);
    
    switch (action.actionType) {
	case Constants.PARSE_FILE:
	    FileStore.parse(action.file, function(results) {
		FileStore.onParseComplete(results);
	    });
	    break;
	default:
	    break;
    }
});

module.exports = FileStore;
