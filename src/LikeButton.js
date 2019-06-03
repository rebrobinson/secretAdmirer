import React, { Component } from 'react';

class LikeButton extends Component {
    render() {
        return (
            //passing the props from the state that this button will need to function properly
            <button className="likes" onClick={() => { this.props.handleLikeClick(this.props.uniqueKeything) }}>
            {this.props.likesthing}
                < i className="fas fa-heart" ></i >
            </button>
        )
    }
}


export default LikeButton



    