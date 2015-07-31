# Choose a make-like tool

* We choose gulp
    * Thinking in streams
    * Concurrent, fast
    * Not intuitive at times
    * Composable and succint (not like Grunt)

* Alternatives:
    * Broccoli
    * Brunch
    * Make
    * Grunt

# Managing our dependencies using Bower

* bower install react
* Dependencies installed in bower_components

# Making your JS dependencies play nice in the browser

* Webpack

* PAY ATTENTION TO THIS ONE THING
    * Name your entry point and the output filename the same if you are creating a JS app without node
    * Remember that the browser does not understand the `require` statement
    * If you do not overwrite your entry file, you will spend many hours hitting your head against the table. Yes, it still hurts
    * You also need to use the Provide plugin if you do not want to use the require statement in your code

* Alternatives:
    * Browserify

# Debugging with Webpack

* webpack --display-error-details
