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

export function toggleMessageStarred(message) {
  const toggledMessage = {...message, starred: !message.starred}
  const request = {messageIds: [message.id], command: 'star', star: toggledMessage.starred}
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
      type: types.MESSAGE_STAR_TOGGLED,
      message: toggledMessage
    })
  }
}
