import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Compose from './components/Compose'
import {  starMessage,
          unstarMessage,
          selectMessage,
          unselectMessage,
          selectAllMessages,
          markMessagesRead,
          markMessagesUnread,
          addLabel,
          removeLabel,
          deleteMessages,
          sendMessage } from './actions/messageListActions'
import './App.css'

class App extends Component {

  onMessagesStarredToggled = index => {
    this.props.messageList[index].starred ?
    this.props.unstarMessage(this.props.messageList[index]) :
    this.props.starMessage(this.props.messageList[index])
  }

  onMessageSelectToggled = index => {
    this.props.messageList[index].selected ?
      this.props.unselectMessage(this.props.messageList[index]) :
      this.props.selectMessage(this.props.messageList[index])
  }

  onSelectAllClicked = () => {
    this.props.selectAllMessages()
  }

  onMarkMessagesRead = () => {
    this.props.markMessagesRead(this.props.messageList.filter(message => message.selected))
  }

  onMarkMessagesUnread = () => {
    this.props.markMessagesUnread(this.props.messageList.filter(message => message.selected))
  }

  onDeleteMessagesClicked = () => {
    this.props.deleteMessages(this.props.messageList.filter(message => message.selected))
  }

  onAddLabelClicked = (e) => {
    //guard against the "Apply label" option
    if(e.target.selectedIndex === 0) return
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    this.props.addLabel(this.props.messageList.filter(message => message.selected), selectedLabel)
  }

  onRemoveLabelClicked = (e) => {
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    this.props.removeLabel(this.props.messageList.filter(message => message.selected), selectedLabel)
  }

  selectedState = () => {
      const selectedCount = this.props.messageList.filter(message => message.selected).length
      if(selectedCount === 0) return 'none' //none selected
      else if(selectedCount === this.props.messageList.length) return 'all' //all selected
      else return 'some' //some selected
  }

  onSendMessageClick = (subject, body) => {
    this.props.sendMessage(subject, body)
    this.setState({
      composeMessageDisplayed: false //collapse compose new message box after sending message
    })
  }

  render() {
    return (
      <div>
        <Toolbar
          onSelectAllClicked={this.onSelectAllClicked}
          onMarkMessagesReadClicked={this.onMarkMessagesRead}
          onMarkMessagesUnreadClicked={this.onMarkMessagesUnread}
          onDeleteMessagesClicked={this.onDeleteMessagesClicked}
          onAddLabelClicked={this.onAddLabelClicked}
          onRemoveLabelClicked={this.onRemoveLabelClicked}
          unreadMessageCount={this.props.messageList.filter(message => !message.read).length}
          selectedState={this.selectedState()}
          composeMessageDisplayed={this.props.composeMessageDisplayed}/>
        {this.props.composeMessageDisplayed && <Compose onSendMessageClick={this.onSendMessageClick}/>}
        <MessageList
          messageList={this.props.messageList}
          onMessagesStarredToggled={this.onMessagesStarredToggled}
          onMessageSelectToggled={this.onMessageSelectToggled}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messageList: state.messageList
})

const mapDispatchToProps = dispatch => bindActionCreators({
  starMessage,
  unstarMessage,
  selectMessage,
  unselectMessage,
  selectAllMessages,
  markMessagesRead,
  markMessagesUnread,
  addLabel,
  removeLabel,
  deleteMessages,
  sendMessage
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
