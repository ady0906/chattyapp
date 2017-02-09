import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

import ChatBar from './ChatBar.jsx';


let data = {
  currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [],
  connected: []
};


class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;

    this.setNewName = this.setNewName.bind(this);

  };

  onMessage = (event) => {
    let msg = JSON.parse(event.data);

    if (msg.type === 'incomingMessage') {

    let messages = [...this.state.messages, msg];
    this.setState({messages})

    } else if (msg.type === 'incomingNotification') {
      msg.styles = {'fontStyle': 'italic', 'color': '#808080', 'fontSize': '90%'};
      let messages = [...this.state.messages, msg];
      this.setState({messages});

    } else if (msg.type === 'howMany') {
      console.log(msg.usersRN);
      let connected = [this.state.connected, msg.usersRN];
      this.setState({connected});
      console.log(this.state);
    }
  }


  componentDidMount() {
    this.socket = new WebSocket("ws://www.localhost:4001");
    this.socket.onmessage = this.onMessage;
  }

  setNewName = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
      console.log('Set new name');

      // setting user name to Anonymous if currentUser.name is non existent

      if (this.state.currentUser.name === '') {
        this.state.currentUser.name = 'Anonymous';
      }

      const newNotification = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed their name to ${event.target.value}`}


      this.socket.send(JSON.stringify(newNotification));

      this.setState({currentUser: {name: event.target.value}});

    } else {

      console.log('nope');

    }
  }


  handlePressEnter = e => {
    if (e.key === "Enter") {
      const newMessage = {type: 'postMessage', username: this.state.currentUser.name, content: e.target.value};
      this.socket.send(JSON.stringify(newMessage));


    } else {
      console.log('nope');
    }
  }

  render() {

      return (
        <div>
          <h1>Chatty</h1><span id='users-connected'>{this.state.connected[1]} users online</span>
          <MessageList messages={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser} handlePressEnter={this.handlePressEnter} setNewName={this.setNewName} />
        </div>
      );
    }
  }

  export default App;
