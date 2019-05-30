import React, { Component } from 'react';

class Message extends Component {
    render() {
        return (                
            <input 
            onChange={this.props.handleChange} 
            name="userMessage"
            type="text" 
            placeholder="what do you want to tell them?" 
            value={this.props.userMessage}
            />
               
        )
    }
}

export default Message