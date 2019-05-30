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
          content: data[id].message
        })
      }


      this.setState({
        letters: newState,
      });
    })
  };

  handleChange = (event) => {
    console.log('change')
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  

  handleClick = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();

    dbRef.push({
      message: this.state.userMessage,
      name: this.state.personsName
    });

    //to make the user input empty again
    this.setState({
      userMessage: '',
      personsName: ''
    });
  }
  

  render(){
    return (
      <div className="App">
        <h1>love, your secret admirer</h1>
        <div class="formWrapper">
          <p class="description">Have a lil crush on someone but not ready to let them know? If you can't keep your feelings to yourself any longer but you're too shy to expose yourself, share it anonymously! And don't worry– your secret is safe with me. ;) </p>
          <form>
            <Name handleChange={this.handleChange} />
            <Message
              handleChange={this.handleChange}
              handleClick={this.handleClick}
            />
            <button class="send" onClick={this.handleClick}>Send</button>
          </form>
        </div>
        
        
        <ul>
          {this.state.letters.map( (message) => {
            return(
              <li key={message.uniqueKey}>
                <p class="recipient">Dear {message.name}</p>
                <p class="theMessage">{message.content}</p>
                <p class="admirer">love, your secret admirer</p>
                <LikeButton />
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;







