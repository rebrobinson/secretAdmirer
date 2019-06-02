import React, { Component } from 'react';

class Name extends Component {
    render() {
        return (
            <input
                onChange={this.props.handleChange}
                name="personsName"
                type="text"
                placeholder="enter the name of the recipient"
                value={this.props.personsName}
                required
            />
        )
    }
}

export default Name

