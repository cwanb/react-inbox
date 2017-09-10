import * as types from './actionTypes'

export function fetchMessages() {
  return async (dispatch) => {
    const initialMessages = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`)
    const json = await initialMessages.json()
    dispatch({
      type: types.MESSAGES_RECEIVED,
      messageList: json._embedded.messages
    })
  }
}

export function starMessage(message) {
  const request = {messageIds: [message.id], command: 'star', star: true}
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    dispatch({
      type: types.MESSAGE_STARRED,
      id: message.id
    })
  }
}

export function unstarMessage(message) {
  const request = {messageIds: [message.id], command: 'star', star: false}
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    dispatch({
      type: types.MESSAGE_UNSTARRED,
      id: message.id
    })
  }
}

export function selectMessage(message) {
  return dispatch => {
    dispatch({
      type: types.MESSAGE_SELECTED,
      id: message.id
    })
  }
}

export function unselectMessage(message) {
  return dispatch => {
    dispatch({
      type: types.MESSAGE_UNSELECTED,
      id: message.id
    })
  }
}


export function selectAllMessages() {
  return dispatch => {
    dispatch({
      type: types.SELECT_ALL_MESSAGES
    })
  }
}

export function markMessagesRead(messages) {
  const request = {messageIds: messages.map(message => message.id), command: 'read', read: true}
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    dispatch({
      type: types.MARK_MESSAGES_READ,
      messages
    })
  }
}

export function markMessagesUnread(messages) {
  const request = {messageIds: messages.map(message => message.id), command: 'read', read: false}
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    dispatch({
      type: types.MARK_MESSAGES_UNREAD,
      messages
    })
  }
}


export function addLabel(messages, selectedLabel) {
  const request = {messageIds: messages.map(message => message.id), command: 'addLabel', label: selectedLabel}

  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      }
    })
    dispatch({
      type: types.ADD_MESSAGES_LABEL,
      selectedLabel
    })
  }
}

export function removeLabel(messages, selectedLabel) {
  const request = {messageIds: messages.map(message => message.id), command: 'removeLabel', label: selectedLabel}

  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      }
    })
    dispatch({
      type: types.REMOVE_MESSAGES_LABEL,
      selectedLabel
    })
  }
}

export function deleteMessages(messages) {
  const request = {messageIds: messages.map(message => message.id), command: 'delete'}
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    dispatch({
      type: types.DELETE_MESSAGES
    })
  }
}

export function sendMessage(subject, body) {
  const request = {"subject": subject, "body": body}
  return async (dispatch) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      }
    })
    const message = await response.json()
    dispatch({
      type: types.SEND_MESSAGE,
      message
    })
  }
}
