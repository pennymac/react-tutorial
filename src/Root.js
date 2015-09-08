var React = require('react');
var Dropzone = require('react-dropzone');
var EventEmitter = require('fbemitter');
var AppDispatcher = require('./AppDispatcher');
var Constants = require('./AppConstants');
var FileStore = require('./FileStore');
var FixedDataTable = require('fixed-data-table');

// Why is this necessary???
require('style-loader!css-loader!fixed-data-table/dist/fixed-data-table.css');

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var FileActions = {
    parse: function(file) {
	AppDispatcher.dispatch({
	    actionType: Constants.PARSE_FILE,
	    file: file
	});
    }
};

var DropzoneComponent = React.createClass({
    onDrop: function(files) {
	files.forEach(function(file) {
	    switch (file.type) {
		case "text/csv":
		    FileActions.parse(file);
		    break;
		default:
		    console.log("Couldn't recognize the file type");
	    }
	});
    },

    render: function() {
	return (
	    <div>
	    <Dropzone onDrop={ this.onDrop }>
	    <div>Drop files here...</div>
	    </Dropzone>
	    </div>
	);
    }
});

var FileDataComponent = React.createClass({
    getInitialState: function() {
	return {
	    rows: []
	};
    },
    
    componentDidMount: function() {
	var self = this;
	FileStore.addParseListener(function(results) {
	    console.log("Parsing complete!");
	    self.setState({ rows: results });
	});
    },

    getRowAtIndex: function(idx) {
	return this.state.rows[idx];
    },
    
    render: function() {
	console.log(this.state.rows);
	return (
	    <div>
	    <Table
	    rowHeight={ 50 }
	    rowGetter={ this.getRowAtIndex }
	    rowsCount={ this.state.rows.length }
	    width={ 500 }
	    height={ 350 }
	    headerHeight={ 50 }>
	    <Column
	    label={ "Col 1" }
	    width={ 250 }
	    dataKey={ 0 }
	    />
	    <Column
	    label={ "Col 2" }
	    width={ 250 }
	    dataKey={ 1 }
	    />
	    </Table>
	    </div>
	);
    }
});

var RootComponent = React.createClass({
    render: function() {
	return (
	    <div>
	    <DropzoneComponent/>
	    <FileDataComponent/>
	    </div>
	);
    }
});

module.exports = RootComponent;
