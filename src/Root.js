var React = require('react');

var styles = {
    fridge: {
        background: '#333',
        color: '#fff',
        padding: '20px'
    }
};

var Fridge = React.createClass({
    render: function() {
        return <div style={ styles.fridge }> I am a fridge. My name is { this.props.name }</div>;
    }
});

var RootComponent = React.createClass({
    render: function() {
        return <div><Fridge name="Antoine"/></div>;
    }
});

module.exports = RootComponent;
