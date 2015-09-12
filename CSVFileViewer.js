'use strict';

var React = require('react');
var FileStore = require('./FileStore');
var Dropzone = require('react-dropzone');
var ActionCreator = require('./ActionCreator');

var {Table, Column} = require('react-partial-table');

var styles = require('./CSVFileViewer.css');

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

    return (
      <div className={ styles.main }>
        <h1>CSV File Viewer</h1>
        <Dropzone onDrop={ this.onDrop }
          className={ this.state.files.length > 0 ? styles.hidden : styles.dropZone}>
          Drop files or click here
        </Dropzone>
        {this.state.files.map((file) =>
          <div>
            <h2>{file.name}</h2>
            { file.data.length === 0 ? 'Loading' :
              <Table
                className={ styles.fullScreenTable }
                fixedHeader={true}
                startRow={2}
                numberOfRows={file.data.length > 500 ? 500 : file.data.length}
                showHeader={true}
                getRowAt={ (rowIndex) => file.data[rowIndex] }
                headerRenderers={file.data[0]}
                columnRenderers={Object.keys(file.data[0])}>
              </Table>
            }
          </div>)
        }
      </div>
    );
  },
});

module.exports = MyComponent;
