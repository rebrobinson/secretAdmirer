import React, {Component} from 'react';
import firebase from './firebase.js';
import Name from './Name.js';
import LikeButton from './LikeButton.js';
import './App.css';

class App extends Component {
  constructor(){
    super();
    //defining the state and putting in all of the things that are going to change
    this.state = {
      //this is an empty array because this is where the data from firebase will be stored that will make up the content inside each love letter
      letters: [],
      userMessage: '',
      personsName: ''
    }
  }

  //when the page loads
  componentDidMount(){
    //referencing the database and storing it as a variable so it's easier to work with
    const dbRef = firebase.database().ref();
    //retrieve the existing data from firebase 
    dbRef.on('value', (response) => {
      //define a variable called newState and give it an empty array where data will be pushed to
      const newState = [];
      //the stuff we get back from firebase is stored as "data"
      const data = response.val();

      //for each object (id) from firebase separate each thing and give them names (uniqueKey, name, content, likes)
      for (let id in data) {
        //then push each of these to the newState array, but use unshift so that the most recent data entries show up at the top of the array 
        newState.unshift({
          uniqueKey: id,
          name: data[id].name,
          content: data[id].message,
          likes: data[id].likes
        })
      }

      //update the state, the empty letters array from the original state now has all the stuff from inside the newState variable
      this.setState({
        letters: newState,
      });
    })
  };

  //this function listens for when the user is typing inside the input, aka any change inside the input, updates the state with that information
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //this function does something on the click of the button
  handleClick = (event) => {
    event.preventDefault();
    
    //error handling
    //if the name input and the message input do not have a value, OR if there is no name but there is a message, OR there is a name but no message, then return an error 
    if ((!this.state.personsName && !this.state.userMessage) || (!this.state.personsName && this.state.userMessage) || (this.state.personsName && !this.state.userMessage)) {
      return this.setState({ error: 'You must fill out all fields!'})
    } else {
      //get the mailbox div and scroll it into view
      document.getElementById('mailbox').scrollIntoView({
        //declaring the behavior of the scroll
        block: 'start',
        behaviour: 'smooth'
      })
      //reference the database, store it as a variable
      const dbRef = firebase.database().ref();
      //take the userMessage and personsName from whatever they are in the state and push those values to firebase
      //this is where we declare 'likes' and give it a starting value of 0
      dbRef.push({
        message: this.state.userMessage,
        name: this.state.personsName,
        likes: 0,
      });
    }

    //to make the user input empty again, update those values in the state to be empty 
    this.setState({ 
      userMessage: '',
      personsName: ''
    });
  }

  //on the click of the like button (pass in uniqueKey as parameter)
  handleLikeClick = (uniqueKey) => {
    //define a new variable called newState (have to do it again because the previous one was not a global variable), inside this variable is a copy of the state
    const newState = Object.assign({}, this.state)

    //define a new variable called letters and make it the current state of the letters from state
    const letters = newState.letters;

    //make a new variable where it will map over each object in the letters array from the state, pass in letter as the parameter
    const newLetters = letters.map( (letter) => {
      //if the uniqueKey that is clicked matches the uniqueKey in firebase,
      if (letter.uniqueKey === uniqueKey) {
        //change the number of likes to the number of likes + 1
        letter.likes = letter.likes + 1;
        //reference the database, specifically the one for the uniqueKey that we want
        const dbRef = firebase.database().ref(uniqueKey);
        //update the value of likes in the database
        dbRef.update({
          likes: letter.likes,
        })
      }
      //if it doesn't match the uniqueKey in firebase, still return the letter
      return letter;
    })

    //update the state so that letters = the newLetters variable (updating so that the number of likes changes)
    this.setState({
      letters: newLetters
    })
  }

  //render everything to the page inside here
  render(){
    return (
      //this div contains everything, return can only have one direct child
      <div className='App'>
        <h1>love, your secret admirer</h1>
        <div className='formWrapper'>
          <p className='description'>Have a lil crush on someone but not ready to let them know? If you can't keep your feelings to yourself any longer but you're too shy to expose yourself, share it anonymously! And don't worry– your secret is safe with me. ;) </p>
          {/* on submit of the form, do the handleClick function */}
          <form onSubmit={this.handleClick} className='form'>
          {/* this is for the error message */}
            {this.state.error && <p>{this.state.error}</p>}
            {/* render the Name component, give it 2 props, the handleChange function and the personsName value from the state */}
            <Name handleChange={this.handleChange} personsName={this.state.personsName}/>
            <textarea
              //giving the textarea input a prop, the hangleChange function
              onChange={this.handleChange}
              name='userMessage'
              placeholder='what do you want to tell them?'
              //input binding so that the textarea input knows about the changes (from the state) being made inside it
              value={this.state.userMessage}>
            </textarea>
            <button className='send'>Send</button>
          </form>
        </div>

        <div className='mailbox' id='mailbox'>
          <h2>
            <i className='fas fa-envelope'></i>
            You've got mail:
            <i className='fas fa-envelope-open-text'></i>
          </h2>
        </div>
        
        <ul className='clearfix'>
          {/* map over each letter from inside letters from the state */}
          {/* for each letter, return all these things */}
          {this.state.letters.map( (letter) => {
            return(
              <li key={letter.uniqueKey}>
                {/* letter.name = from each singular object from the array of letters, go into it and get the name value */}
                <p className='recipient'>Dear {letter.name}</p>
                <p className='theMessage'>{letter.content}</p>
                <p className='admirer'>love, your secret admirer</p>
                {/* rendering the like button, giving it props that it needs to have access to (the uniqueKey, the number of likes, and the handleLikeClick function) */}
                <LikeButton uniqueKeything={letter.uniqueKey} handleLikeClick={this.handleLikeClick} likesthing={letter.likes} />
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







