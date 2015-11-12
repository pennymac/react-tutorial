'use strict';

import React from 'react';
import FileStore from './FileStore';
import ActionCreator from './FileActionCreator';
import {csv, tsv} from 'd3-dsv';
import {MaxRows} from './Constants';
import {Table, Column} from 'fixed-data-table';
import styles from './app.css';

var FileViewer;

export default FileViewer = React.createClass({

  getInitialState: function() {
    return {
      files: [],
      mode: 0
    };
  },

  componentDidMount: function() {
    this.subscription = FileStore.addListener( this.onStoreChanged );
  },

  componentWillUnmount: function() {
    this.subscription.remove();
  },

  onStoreChanged() {
    this.setState({
      files: Object.keys(FileStore.getState().toJS())
    })
  },

  handleClickChangeMode: function() {
    this.setState( { mode: this.state.mode === 0 ? 1 : 0 } );
  },

  render: function() {

    var self = this;
    var storeState = FileStore.getState();

    function getFileData(file) {
      return (storeState.getIn([file, 'content']) || []);
    }

    function makeTable(file) {
      var filedata = csv.parse(getFileData(file));

      if (filedata.length === 0) {
        return <div>No data for {file}</div>;
      }

      if (self.state.mode === 1) {
        return <pre>{tsv.format(filedata)}</pre>;
      }

      return (
        <Table rowHeight={50}
               headerHeight={50}
               width="1024"
               height={400}
               rowsCount={MaxRows < filedata.length ? MaxRows : filedata.length }
               rowGetter={ (rowIndex) => filedata[rowIndex] }>
          { Object.keys(filedata[0]).map( (n, i) => <Column label={n} width={100} dataKey={n} /> ) }
        </Table>
      );
    }

    return (
      <div className={ styles.main }>
        <label>
          <input onChange={this.handleClickChangeMode} type="checkbox" />Show Text
        </label>
        {this.state.files.map((file) =>
          <div key={file}>
           <h2>{file}</h2>
            <span>
              { makeTable(file)  }
            </span>
          </div>)
        }
      </div>
    );
  }
});
