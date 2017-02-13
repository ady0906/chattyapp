import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: ""},
      messages: [],
      connected: []
    };

    this.setNewName = this.setNewName.bind(this);

  };

  setNewName = (name) => {

    const newNotification = {
      type: 'postNotification',
      content: `${this.state.currentUser.name === "" ? "Anonymous" : this.state.currentUser.name } has changed their name to ${name === "" ? "Anonymous" : name }`}

    this.socket.send(JSON.stringify(newNotification));
    this.setState({currentUser: {name: name}});
  }

  submitMessage = (msg) => {
    const newMessage = {type: 'postMessage', username: this.state.currentUser.name, content: msg};
    this.socket.send(JSON.stringify(newMessage));
  }

  addMessage = (msg) => {
    this.setState({messages: [...this.state.messages, msg]});
  }

  addNotification = (msg) => {
    // msg.styles = {'fontStyle': 'italic', 'color': '#808080', 'fontSize': '90%'};
    // msg.className = 'name-change';
    let messages = [...this.state.messages, msg];
    this.setState({messages});
  }

  updateUserCount = (count) => {
    this.setState({connected: count});
  }

  onMessage = (event) => {
    let msg = JSON.parse(event.data);

    switch(msg.type) {
      case 'incomingMessage':
        this.addMessage(msg);
        break;
      case 'incomingNotification':
        this.addNotification(msg);
        break;
      case 'howMany':
        this.updateUserCount(msg.usersRN);
        break;
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://www.localhost:4001");
    this.socket.onmessage = this.onMessage;
  }

  render() {
      return (
        <div>
          <h1>Chatty</h1>
          <span id='users-connected'>{this.state.connected} users online</span>
          <MessageList messages={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser} submitMessage={this.submitMessage} setNewName={this.setNewName} />
        </div>
      );
    }
  }

  export default App;
