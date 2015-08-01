var RootComponent = require('./root');
var React = require('react');

var rootInstance = React.render(<RootComponent />, document.getElementById("main"));

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function() {
            // Help React Hot Loader figure out the root component instances on the page;
            return [rootInstance];
        }
    });
}
