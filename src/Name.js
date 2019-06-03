import React, { Component } from 'react';

class Name extends Component {
    render() {
        return (
            <input
                // passing the props from the state that this component needs to function
                onChange={this.props.handleChange}
                name="personsName"
                type="text"
                placeholder="enter the name of the recipient"
                value={this.props.personsName}
            />
        )
    }
}

export default Name

