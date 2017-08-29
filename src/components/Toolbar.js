import React from 'react'

const Toolbar = ({onSelectAllClicked,
                onMarkMessagesClicked,
                onDeleteMessagesClicked,
                onAddLabelClicked,
                onRemoveLabelClicked,
                unreadMessageCount,
                selectedState}) => {
  const selectIconStyle = selectedState === 'none' ? 'fa-square-o' : selectedState === 'all' ? 'fa-check-square-o' : 'fa-minus-square-o'
  const readButtonsDisabled = selectedState === 'none'

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMessageCount}</span>
          unread message{unreadMessageCount !== 1 && 's'}
        </p>

        <button className="btn btn-default" onClick={onSelectAllClicked}>
          <i className={`fa ${selectIconStyle}`}></i>
        </button>

        <button className="btn btn-default" onClick={() => onMarkMessagesClicked(true)} disabled={readButtonsDisabled}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={() => onMarkMessagesClicked(false)} disabled={readButtonsDisabled}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange={(e) => onAddLabelClicked(e)}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={(e) => onRemoveLabelClicked(e)}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={onDeleteMessagesClicked}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
)}
export default Toolbar
