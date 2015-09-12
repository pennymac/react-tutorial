'use strict';

var CSVFileViewer = require('./CSVFileViewer');
var React = require('react');
var {Route} = require('react-router');

module.exports = <Route handler={CSVFileViewer} />;
