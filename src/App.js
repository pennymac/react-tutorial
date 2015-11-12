import React, { Component } from 'react';
import FileViewer from './FileViewer';
import Dropzone from 'react-dropzone';
import styles from './app.css';
import ActionCreator from './FileActionCreator';

export class App extends Component {

  onDrop(files) {
    files.forEach((file) => {

      if( file.type !== 'text/csv') {
        alert("Only files with 'csv' extension are supported.")
        return;
      }

      ActionCreator.loadFile(file);
    });
  }

  render() {
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
}
