import React from 'react'

class Toolbar extends React.Component {
  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadMessageCount}</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.props.onSelectAllClicked}>
            <i className="fa fa-check-square-o"></i>
          </button>

          <button className="btn btn-default" onClick={() => this.props.onMarkMessagesClicked(true)}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={() => this.props.onMarkMessagesClicked(false)}>
            Mark As Unread
          </button>

          <select className="form-control label-select" onChange={(e) => this.props.onAddLabelClicked(e)}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={(e) => this.props.onRemoveLabelClicked(e)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.props.onDeleteMessagesClicked}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}
export default Toolbar
