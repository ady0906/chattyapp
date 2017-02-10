import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    let results = this.props.messages;
    return (
      <main className="messages">
        <ul>
            {results.map(function(result) {
              return (
                <li key={result.id}>
                  <div className="message-username" style={result.fontColor}>{result.username}</div><div className="message-content"
                    style={result.styles}>{result.content}</div>
                </li>

                )
              })}
        </ul>
      </main>
    );
  }
}
export default MessageList;
