import React, { Component } from 'react';
import FileViewer from './FileViewer';
import Dropzone from 'react-dropzone';
import styles from './app.css';
import ActionCreator from './FileActionCreator';

var App;

export default App = React.createClass( {

  onDrop: function(files) {
    files.forEach((file) => {

      if( file.type !== 'text/csv') {
        alert("Only files with 'csv' extension are supported.")
        return;
      }

      ActionCreator.loadFile(file);
    });
  },

  render: function() {
    return (
      <div>
        <h1> File Viewer</h1>
        <Dropzone onDrop={ this.onDrop }
                  className={ styles.dropZone }>
          Drop files or click here
        </Dropzone>
        <FileViewer />
      </div>
    );
  }
} );
