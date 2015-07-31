var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

var runSequence = require('run-sequence');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var isWatching = false;

/**
 * babel
 *
 * Converts JSX code in a JavaScript file to its corresponding
 * React components
 */
gulp.task('babel', function() {
    return gulp.src('src/*.js')
        .pipe(plugins.babel({ modules: 'umd' }))
        .pipe(gulp.dest('build'))
        .pipe(plugins.livereload());
});

/**
 * html
 *
 * Copies and pastes the index.html file in the build folder
 */
gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('build'))
        .pipe(plugins.livereload());
});

/**
 * webpack
 *
 * Compiles JS assets to be able to be used in the browser
 */
gulp.task('webpack', function(callback) {
    var config = require('./webpack.config.js');
    var compiler = webpack(config);

    if (isWatching) {
        compiler.watch({
            aggregateTimeout: 200
        }, function(err, stats) {
            if (err) {
                throw new plugins.util.PluginError('webpack', err);
            }

            console.log(stats.toString({
                colors: plugins.util.colors.supportsColor,
            }));

            callback();
        });
    }
});

gulp.task('build', ['babel', 'html']);

gulp.task('watch', ['build'], function() {
    isWatching = true;
    plugins.livereload.listen();
    gulp.watch('src/*.js', ['babel']);
    gulp.watch('src/index.html', ['html']);
});


gulp.task('webpack-dev-server', function(callback) {
    var config = require('./webpack.config.js');
    var compiler = webpack(config);

    new WebpackDevServer(compiler, {
    }).listen(8080, 'localhost', function(err) {
        if (err) throw new plugins.util.PluginError('webpack-dev-server', err);
        
        plugins.util.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
        callback();
    });
});

gulp.task('serve', ['webpack-dev-server'], function(callback) {
    isWatching = true;
    gulp.src('build')
        .pipe(plugins.webserver({
            livereload: true
        }));
    runSequence('watch', 'webpack', callback);
});

/**
 * default
 *
 * Runs babel and html tasks concurrently
 */
gulp.task('default', ['babel', 'html']);
