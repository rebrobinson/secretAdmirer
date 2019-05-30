import React, { Component } from 'react';


class LikeButton extends Component {
    constructor(){
        super();
        this.state = {
            likes: 0
        }
    }

    handleLikeClick = () => {
        const newState = Object.assign({}, this.state)
        console.log(newState)
        newState.likes = newState.likes + 1
        this.setState(newState)
    }

    render() {
        return (
            <button class="likes" onClick={this.handleLikeClick}>{this.state.likes}</button>
        )
    }
}


export default LikeButton