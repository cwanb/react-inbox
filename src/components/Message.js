import React from 'react'
import {Link} from 'react-router-dom'

const Message = ({id,
                  subject,
                  body,
                  read,
                  selected,
                  starred,
                  labels,
                  shouldDisplayBody,
                  onMessageStarredToggled,
                  onMessageSelectToggled
                  }) => {
  const readStyle = read ? 'read' : 'unread'
  const selectedStyle = selected ? 'selected' : ''
  const starredStyle = starred ? 'fa-star' : 'fa-star-o'
  const labelsRender = labels.map((label, index) =>
    <span className="label label-warning" key={index}>
      {label}
    </span>)

  const messageBodyLink = shouldDisplayBody ? '/' : '/messages/' + id

  return (
    <div>
    <div className={`row message ${readStyle} ${selectedStyle}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={selected || false} onChange={onMessageSelectToggled}/>
          </div>
          <div className="col-xs-2" onClick={onMessageStarredToggled}>
            <i className={`star fa ${starredStyle}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labelsRender}
        <Link to={messageBodyLink}>
          {subject}
        </Link>
      </div>
    </div>
    {shouldDisplayBody &&
    <div className="row message-body">
      <div className="col-xs-11 col-xs-offset-1">
        {body}
      </div>
    </div>
    }
</div>
  )
}
export default Message
