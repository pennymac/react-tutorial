var React = require('react');

var styles = {
    fridge: {
        background: '#333',
        color: '#fff',
        padding: '20px'
    }
};

var FoodList = React.createClass({
    render: function() {
        var addItem = function(itemText, index) {
            return <li key={ index + itemText }>{ itemText }</li>;
        };
        return <ul>{ this.props.items.map(addItem) }</ul>;
    }
});

var buttonStyle = {
    color: 'black'
};

var inputStyle = {
    color: 'black'
}

var Fridge = React.createClass({
    getInitialState: function() {
        return {
            items: [],
            text: ''
        };
    },
    onChange: function(e) {
        this.setState({ text: e.target.value });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([this.state.text]);
        var nextText = '';
        this.setState({ items: nextItems, text: nextText });
    },
    render: function() {
        return (
            <div style={ styles.fridge }>
                <p>I am a fridge. My name is { this.props.name }</p>
                <FoodList items={ this.state.items }/>
                <form onSubmit={ this.handleSubmit }>
                    <input style={ inputStyle } onChange={ this.onChange } value={ this.state.text }/>
                    <button style={ buttonStyle }>{ 'Add #' + (this.state.items.length + 1) }</button>
                </form>
            </div>
        );
    }
});

var RootComponent = React.createClass({
    render: function() {
        return <div><Fridge name="Antoine"/></div>;
    }
});

module.exports = RootComponent;
