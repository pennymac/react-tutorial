import React, { Component } from 'react';
import FileViewer from './FileViewer';
import Dropzone from 'react-dropzone';
import styles from './app.css';
import ActionCreator from './ActionCreator';

export class App extends Component {

  onDrop(files) {
    files.forEach((file) => {
      ActionCreator.loadFile(file);

      var r = new FileReader();

      r.onload = function(e) {
        ActionCreator.loadFileData( file, e.target.result);
      };

      r.readAsText(file);
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
