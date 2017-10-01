import React from 'react'
import Message from './Message'

const MessageList = ({messageList,
                      onMessageStarredToggled,
                      onMessageReadToggled,
                      onMessageSelectToggled,
                      displayBodyOfMessageId}) => {
  return (
    <div>
      {messageList.map((message, index) =>
        <Message
          key={index}
          id={message.id}
          subject={message.subject}
          body={message.body}
          read={message.read}
          selected={message.selected}
          starred={message.starred}
          labels={message.labels}
          shouldDisplayBody={displayBodyOfMessageId === message.id}
          onMessageStarredToggled={() => onMessageStarredToggled(index)}
          onMessageSelectToggled={() => onMessageSelectToggled(index)}
        />)}
    </div>
  )
}
export default MessageList
