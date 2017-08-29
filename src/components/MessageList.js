import React from 'react'
import Message from './Message'

class MessageList extends React.Component {
  render() {
    return (
      <div>
        {this.props.messageList.map((message, index) =>
          <Message
            key={index}
            subject={message.subject}
            read={message.read}
            selected={message.selected}
            starred={message.starred}
            labels={message.labels}
            onMessagesStarredToggled={() => this.props.onMessagesStarredToggled(index)}
            onMessageReadToggled={() => this.props.onMessageReadToggled(index)}
            onMessageSelectToggled={() => this.props.onMessageSelectToggled(index)}
          />)}
      </div>
    )
  }
}

export default MessageList
