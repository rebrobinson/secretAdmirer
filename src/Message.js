import React, { Component } from 'react';

class Message extends Component {
    render() {
        return (                
            <textarea
                onChange={this.props.handleChange}
                name="userMessage"
                // type="text" 
                placeholder="what do you want to tell them?"
                value={this.props.userMessage}> 
            
            </textarea>
        )
    }
}

export default Message