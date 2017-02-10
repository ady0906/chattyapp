import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

import ChatBar from './ChatBar.jsx';


let data = {
  currentUser: {name: ""},
  messages: [],
  connected: []
};


class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;

    this.setNewName = this.setNewName.bind(this);

  };

// funnel the incoming messages into different pathes depending on the type

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
      let connected = [this.state.connected, msg.usersRN];
      this.setState({connected});
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://www.localhost:4001");
    this.socket.onmessage = this.onMessage;
  }

  // event listeners triggered by the enter key on the input fields

  setNewName = (event) => {
    if (event.key === "Enter") {

      // setting user name to Anonymous if currentUser.name is non existent

      if (this.state.currentUser.name === '') {
        this.state.currentUser.name = 'Anonymous';
      }

      const newNotification = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed their name to ${event.target.value}`}

      this.socket.send(JSON.stringify(newNotification));
      this.setState({currentUser: {name: event.target.value}});
    }
  }


  handlePressEnter = e => {
    if (e.key === "Enter") {
      const newMessage = {type: 'postMessage', username: this.state.currentUser.name, content: e.target.value};
      this.socket.send(JSON.stringify(newMessage));
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
