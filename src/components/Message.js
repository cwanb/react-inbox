import React from 'react'

class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const readStyle = this.props.read
      ? 'read'
      : 'unread'

    const selectedStyle = this.props.selected
      ? 'selected'
      : ''

    const starredStyle = this.props.starred
      ? 'fa-star'
      : 'fa-star-o'

    const labels = this.props.labels.map((label, index) => <span className="label label-warning" key={index}>{label}</span>)

    return (
      <div className={`row message ${readStyle} ${selectedStyle}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={this.props.selected}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starredStyle}`}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {labels}
          <a href="#">
            Here is some message text that has a bunch of stuff
          </a>
        </div>
      </div>

    )
  }
}

export default Message
