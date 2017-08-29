import React from 'react'
import Message from './Message'

const MessageList = ({messageList,
                      onMessagesStarredToggled,
                      onMessageReadToggled,
                      onMessageSelectToggled}) => {
  return (
    <div>
      {messageList.map((message, index) =>
        <Message
          key={index}
          subject={message.subject}
          read={message.read}
          selected={message.selected}
          starred={message.starred}
          labels={message.labels}
          onMessagesStarredToggled={() => onMessagesStarredToggled(index)}
          onMessageReadToggled={() => onMessageReadToggled(index)}
          onMessageSelectToggled={() => onMessageSelectToggled(index)}
        />)}
    </div>
  )
}
export default MessageList
