import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

import ChatBar from './ChatBar.jsx';


let data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
};


class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;

  };

  onMessage = (event) => {
    let msg = JSON.parse(event.data);
    let messages = [...this.state.messages, msg];
    this.setState({messages})
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://www.localhost:4001");
    this.socket.onmessage = this.onMessage;

    // let mySocket = new WebSocket("ws://www.localhost:4000");
    // console.log('Connected to server ...');

  }


  handlePressEnter = e => {
    if (e.key === "Enter") {
      const newMessage = {username: 'Bob', content: e.target.value};
      this.socket.send(JSON.stringify(newMessage));
      console.log('sent to socket!');


    } else {
      console.log('nope');
    }
  }

  render() {

      return (
        <div>
          <h1>Chatty</h1>
          <MessageList messages={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser} handlePressEnter={this.handlePressEnter} />
        </div>
      );
    }
  }

  export default App;
