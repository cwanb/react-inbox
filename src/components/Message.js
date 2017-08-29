import React from 'react'

const Message = ({subject,
                  read,
                  selected,
                  starred,
                  labels,
                  onMessageSelectToggled,
                  onMessagesStarredToggled}) => {
  const readStyle = read ? 'read' : 'unread'
  const selectedStyle = selected ? 'selected' : ''
  const starredStyle = starred ? 'fa-star' : 'fa-star-o'
  const labelsRender = labels.map((label, index) =>
    <span className="label label-warning" key={index}>
      {label}
    </span>)

  return (
    <div className={`row message ${readStyle} ${selectedStyle}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={selected || false} onChange={onMessageSelectToggled}/>
          </div>
          <div className="col-xs-2" onClick={onMessagesStarredToggled}>
            <i className={`star fa ${starredStyle}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labelsRender}
        <a href="#">
          {subject}
        </a>
      </div>
    </div>
  )
}
export default Message
