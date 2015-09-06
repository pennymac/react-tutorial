var React = require('react');

var SimpleComponent = React.createClass({
    render: function() {
        return <div>I am a React component</div>;
    }
});

var RootComponent = React.createClass({
    render: function() {
        return <div><SimpleComponent/></div>;
    }
});

module.exports = RootComponent;
