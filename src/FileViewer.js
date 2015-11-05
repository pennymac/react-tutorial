'use strict';

import React, {Component}  from 'react';
import FileStore from './FileStore';
import ActionCreator from './ActionCreator';
import {tsv} from 'd3-dsv';
import {MaxRows} from './Constants';
import {Table, Column} from 'fixed-data-table';
import styles from './app.css';

export default class FileViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      mode: 1
    }
    this.onStoreChanged = this.onStoreChanged.bind(this);
    this.handleClickChangeMode = this.handleClickChangeMode.bind(this);
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



  handleClickChangeMode() {
    this.setState( { mode: this.state.mode === 0 ? 1 : 0 } );
  }

  render() {

    var self = this;

    function _d(n) {
      return (FileStore.getFileData(n) || []);
    }

    function makeTable(file) {

      if (self.state.mode === 0) {
        return <pre>{tsv.format(_d(file.name))}</pre>;
      }

      return (
        <Table rowHeight={50}
               headerHeight={50}
               width="1024"
               height={400}
               rowsCount={MaxRows < FileStore.getFileData(file.name).length ? MaxRows : FileStore.getFileData(file.name).length }
               rowGetter={ (rowIndex) => _d(file.name)[rowIndex] }>
          { Object.keys(_d(file.name)[0]).map( (n, i) => <Column label={n} width={100} dataKey={n} /> ) }
        </Table>
      );
    }

    return (
      <div className={ styles.main }>
        <label>
          <input onChange={this.handleClickChangeMode} type="checkbox" />Show Text
        </label>
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
