var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

var del = require('del');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

gulp.task('clean', function() {
    del(['build']);
});

/**
 * webpack
 *
 * Compiles JS assets to be able to be used in the browser
 */
gulp.task('webpack', function() {
    var compiler = webpack(config);
    var compilerRunCount = 0;

    compiler.watch({
        aggregateTimeout: 200
    }, function(err, stats) {
        if (err) {
            throw new plugins.util.PluginError('webpack', err);
        }

        plugins.util.log('[webpack]', stats.toString({
            colors: plugins.util.colors.supportsColor,
        }));

        plugins.util.log('[webpack]', "Compiler run count: " + ++compilerRunCount);
    });
});

gulp.task('webpack-dev-server', function(callback) {
    var compiler = webpack(config);

    var server = new WebpackDevServer(compiler, {
        hot: true
    });
    
    server.listen(3000, 'localhost', function(err) {
        if (err) throw new plugins.util.PluginError('webpack-dev-server', err);
        
        plugins.util.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
        callback();
    });
});

gulp.task('serve', ['default']);

gulp.task('default', ['webpack', 'webpack-dev-server']);
