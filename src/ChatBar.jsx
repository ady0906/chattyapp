import React, {Component} from 'react';



class ChatBar extends Component {

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder= "Enter your name here" defaultValue= {this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress= {this.props.handlePressEnter} />
      </footer>
    );
  }
}
export default ChatBar;
