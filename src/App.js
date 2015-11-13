import React, { Component } from 'react';
import FileViewer from './FileViewer';
import Dropzone from 'react-dropzone';
import styles from './app.css';
import { LOAD_FILE_DATA, LOAD_FILE } from './FileActions'
import { dispatch } from 'fluxury';

var App;

export default App = React.createClass( {

  onDrop: function(files) {
    files.forEach((file) => {

      if( file.type !== 'text/csv') {
        alert("Only files with 'csv' extension are supported.")
        return;
      }

      dispatch(LOAD_FILE, file);

      var r = new FileReader();

      r.onload = function(e) {
        dispatch(LOAD_FILE_DATA, {
          file: file,
          content: e.target.result
        });
      };

      r.readAsText(file);

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
