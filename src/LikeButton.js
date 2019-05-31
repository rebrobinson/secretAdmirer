import React, { Component } from 'react';
import firebase from './firebase.js';


class LikeButton extends Component {
    constructor(){
        super();
        this.state = {
            likeNumber: 0
        }
    }


    render() {
        return (
            <button class="likes" onClick={() => {this.props.handleLikeClick(this.props.uniqueKey)}}>{this.props.likes}</button>
        )
    }
}


export default LikeButton