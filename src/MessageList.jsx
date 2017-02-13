import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <ul>
            {this.props.messages.map(function(result) {
              return (
                <li key={result.id} className={"message " + result.type}>
                  <div className="message-username" style={result.fontColor}>
                    {result.username === "" ? "Anonymous" : result.username}
                  </div>
                  <div className="message-content" style={result.styles}>
                    {result.content}
                  </div>
                </li>

                )
              })}
        </ul>
      </main>
    );
  }
}
export default MessageList;
