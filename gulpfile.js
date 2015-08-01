var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

var runSequence = require('run-sequence');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

/**
 * html
 *
 * Copies and pastes the index.html file in the build folder
 */
gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
});

gulp.task('babel', function() {
    return gulp.src('src/*.js')
        .pipe(plugins.babel({ modules: 'umd' }))
        .pipe(gulp.dest('build'));
});

/**
 * webpack
 *
 * Compiles JS assets to be able to be used in the browser
 */
gulp.task('webpack', function(callback) {
    var compiler = webpack(config);

    compiler.watch({
        aggregateTimeout: 200
    }, function(err, stats) {
        if (err) {
            throw new plugins.util.PluginError('webpack', err);
        }

        plugins.util.log('[webpack]', stats.toString({
            colors: plugins.util.colors.supportsColor,
        }));

        callback();
    });
});

gulp.task('build', ['html']);

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

gulp.task('serve', ['html', 'webpack', 'webpack-dev-server']);

/**
 * default
 *
 * Runs babel and html tasks concurrently
 */
gulp.task('default', ['babel', 'html']);
