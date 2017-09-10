import * as types from '../actions/actionTypes'

export default function messageList(messageList=[], action) {
  switch(action.type) {
    case types.MESSAGES_RECEIVED:
      return action.messageList
    case types.MESSAGE_STARRED:
      return messageList.map(message => {
        if(message.id === action.id) {
          message.starred = true
        }
        return message
      })
    case types.MESSAGE_UNSTARRED:
      return messageList.map(message => {
        if(message.id === action.id) {
          message.starred = false
        }
        return message
      })
    case types.MESSAGE_SELECTED:
      return messageList.map(message => {
        if(message.id === action.id) {
          message.selected = true
        }
        return message
      })
    case types.MESSAGE_UNSELECTED:
      return messageList.map(message => {
        if(message.id === action.id) {
          message.selected = false
        }
        return message
      })
    case types.SELECT_ALL_MESSAGES:
      return messageList.find(message => !message.selected) ?
        messageList.map(message => {return {...message, selected: true}}) :
        messageList.map(message => {return {...message, selected: false}})
    case types.MARK_MESSAGES_READ:
      return messageList.map(message => {
        if(action.messages.find(readMessage => readMessage.id === message.id)) {
          message.read = true
        }
        return message
      })
    case types.MARK_MESSAGES_UNREAD:
      return messageList.map(message => {
        if(action.messages.find(readMessage => readMessage.id === message.id)) {
          message.read = false
        }
        return message
      })
    case types.ADD_MESSAGES_LABEL:
      return messageList.map(message => {
        if(message.selected && !message.labels.find(label => label === action.selectedLabel)) {
          message.labels.push(action.selectedLabel)
        }
        return message
      })
    case types.REMOVE_MESSAGES_LABEL:
      return messageList.map(message => {
        if(message.selected) {
          message.labels = message.labels.filter(label => label !== action.selectedLabel)
        }
        return message
      })
    case types.DELETE_MESSAGES:
      return messageList.filter(message => !message.selected)
    case types.SEND_MESSAGE:
      return [...messageList, action.message]
    default:
      return messageList
  }
}
