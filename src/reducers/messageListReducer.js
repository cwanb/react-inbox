import * as types from '../actions/actionTypes'

export default function messageList(messageList=[], action) {
  switch(action.type) {
    case types.MESSAGES_RECEIVED:
      return action.messageList
    case types.MESSAGE_STAR_TOGGLED:
      let messageListCopy = [...messageList]
      const messageIndex = messageListCopy.findIndex(message => message.id === action.message.id)
      messageListCopy[messageIndex] = action.message
      return messageListCopy
    default:
      return messageList
  }
}
