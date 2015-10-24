'use strict';

import React, {Component}  from 'react';
import FileStore from './FileStore';
import Dropzone from 'react-dropzone';
import ActionCreator from './ActionCreator';
import {tsv} from 'd3-dsv';

import {Table, Column} from 'react-partial-table';

import styles from './CSVFileViewer.css';

export default class CSVFileViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
    this.onStoreChanged = this.onStoreChanged.bind(this);
  }

  componentDidMount() {
    FileStore.addListener( this.onStoreChanged );
  }

  componentWillUnmount() {
    FileStore.removeListener( this.onStoreChanged );
  }

  onStoreChanged() {
    this.setState({
      files: FileStore.getFiles()
    })
  }

  onDrop(files) {
    files.forEach((file) => {
      ActionCreator.loadFile(file);
    });
  }

  render() {

    function _d(n) {
      return (FileStore.getFileData(n) || []);
    }

    function makeTable(file) {

      return <pre>{tsv.format(_d(file.name))}</pre>;
      
      return (
        <Table
                className={ styles.fullScreenTable }
                fixedHeader={true}
                startRow={2}
                numberOfRows={_d(file.name).length > 500 ? 500 : _d(file.name).length}
                showHeader={true}
                getRowAt={ (rowIndex) => _d(file.name)[rowIndex] }
                headerRenderers={_d(file.name)[0]}
                columnRenderers={Object.keys(_d(file.name)[0])}>
        </Table>
      );
    }

    return (
      <div className={ styles.main }>
        <h1>CSV File Viewer</h1>
        <Dropzone onDrop={ this.onDrop }
                  className={ this.state.files.length > 0 ? styles.hidden : styles.dropZone}>
          Drop files or click here
        </Dropzone>
        {this.state.files.filter((d) => d.name).map((file) =>
          <div key={file.name}>
           <h2>{file.name}</h2>
            <span>
              { _d(file.name) && _d(file.name).length > 0 ? makeTable(file) : 'Loading'  }
            </span>
          </div>)
        }
      </div>
    );
  }
}
