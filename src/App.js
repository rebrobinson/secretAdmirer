import React, {Component} from 'react';
import firebase from './firebase.js';
import Name from './Name.js';
import Message from './Message.js';
import LikeButton from './LikeButton.js';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      letters: [],
      userMessage: '',
      personsName: ''
    }
  }

  componentDidMount(){
    const dbRef = firebase.database().ref();
    dbRef.on('value', (response) => {

      const newState = [];
      const data = response.val();

      for (let id in data) {
        newState.push({
          uniqueKey: id,
          name: data[id].name,
          content: data[id].message,
          likes: data[id].likes
        })
      }

      this.setState({
        letters: newState,
      });
    })
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();
  
    dbRef.push({
      message: this.state.userMessage,
      name: this.state.personsName,
      likes: 0,
    });

    //to make the user input empty again
    this.setState({ 
      userMessage: '',
      personsName: ''
    });
  }

  handleLikeClick = (uniqueKey) => {
    const newState = Object.assign({}, this.state)
 

    const letters = newState.letters;

    const newLetters = letters.map( (letter) => {
      if (letter.uniqueKey === uniqueKey) {
        letter.likes = letter.likes + 1;
        const dbRef = firebase.database().ref(uniqueKey);
        dbRef.update({
          likes: letter.likes,
      })
      }
      return letter;
    })

    console.log(newLetters);
    this.setState({
      letters: newLetters
    })
  }
  

  render(){
    return (
      <div className="App">
        <h1>love, your secret admirer</h1>
        <div className="formWrapper">
          <p className="description">Have a lil crush on someone but not ready to let them know? If you can't keep your feelings to yourself any longer but you're too shy to expose yourself, share it anonymously! And don't worry– your secret is safe with me. ;) </p>
          <form>
            <Name handleChange={this.handleChange} />
            <Message
              handleChange={this.handleChange}
              handleClick={this.handleClick}
            />
            <button className="send" onClick={this.handleClick}>Send</button>
          </form>
        </div>

        <div className="mailbox">
          <h2>
            <i className="fas fa-envelope"></i>
            You've got mail:
            <i className="fas fa-envelope-open-text"></i>
          </h2>
        </div>
        
        <ul>
          {this.state.letters.map( (message) => {
            return(
              <li key={message.uniqueKey}>
                <p className="recipient">Dear {message.name}</p>
                <p className="theMessage">{message.content}</p>
                <p className="admirer">love, your secret admirer</p>
                <LikeButton uniqueKey={message.uniqueKey} handleLikeClick={this.handleLikeClick} likes={message.likes} />
                {/* <p>{message.likes}</p> */}
              </li>
            )
          })}
        </ul>
        <footer>
          <p>made by becky robinson | beckyiscoding.com</p>
        </footer>
      </div>
    );
  }
}

export default App;







