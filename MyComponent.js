'use strict';

var React = require('react');
var FileStore = require('./FileStore');
var Dropzone = require('react-dropzone');
var ActionCreator = require('./ActionCreator');

var {Table, Column} = require('react-partial-table');

var styles = require('./MyComponent.css');

var MyComponent = React.createClass({

  getInitialState: function() {
    return {
      files: []
    }
  },

  componentDidMount: function() {
    FileStore.on('change', this.onStoreChanged);
  },

  componentWillUnmount: function() {
    FileStore.removeListener('change', this.onStoreChanged)
  },

  onStoreChanged: function() {
    this.setState({
      files: FileStore.getFiles()
    })
  },

  onDrop: function(files) {
    files.forEach(function(file) {
      ActionCreator.parseFile(file);
    });
  },

  render: function() {
    var tables = this.state.files.map((file) =>
    <div>
      <h1>{file.name}</h1>
      <Table
        fixedHeader={true}
        startRow={1}
        numberOfRows={file.data.length}
        showHeader={true}
        getRowAt={ (rowIndex) => file.data[rowIndex] }
        headerRenderers={file.data[0]}>
        { file.data[0].map((n, i) =>
          <Column cellRenderer={i} /> )}
      </Table>
    </div>);

    return (
      <div className={ styles.main }>
        <h1>CSV File Viewer</h1>
        <Dropzone onDrop={ this.onDrop }>
          <div>Drop files here...</div>
        </Dropzone>
        {tables}
      </div>
    );
  },
});

module.exports = MyComponent;
