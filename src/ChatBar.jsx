import React, {Component} from 'react';



class ChatBar extends Component {

  constructor (props) {
    super(props)
    this.state = {message: ""}

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  handleNameChange (e) {
    if (e.key === "Enter") {
      this.props.setNewName(e.target.value);
    }
  }

  handleMessageChange (e) {
    this.setState({message: e.target.value});
  }

  handleMessageSubmit (e) {
    if (e.key === "Enter") {
      this.props.submitMessage(e.target.value);
      this.setState({message: ""})
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Enter your name here" onKeyPress={this.handleNameChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.handleMessageChange} onKeyPress={this.handleMessageSubmit} value={this.state.message}/>
      </footer>
    );
  }
}
export default ChatBar;
