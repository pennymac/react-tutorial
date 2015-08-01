var React = require('react');

var Fridge = React.createClass({
    render: function() {
        return <div> I am a fridge. My name is { this.props.name }</div>;
    }
});

var RootComponent = React.createClass({
    render: function() {
        return <div><Fridge name="Antoine"/></div>;
    }
});

module.exports = RootComponent;
