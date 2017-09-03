import React, {Component} from 'react'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import BaseURL from './helpers/BaseURL'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: []
    }
  }

  async componentDidMount() {
      const initialMessages = await fetch(`${BaseURL}/api/messages`)
      const json = await initialMessages.json()
      this.setState({messageList: json._embedded.messages})
  }

  onMessagesStarredToggled = (index) => {
    let stateCopy = Object.assign({}, this.state)
    stateCopy.messageList[index].starred = !stateCopy.messageList[index].starred
      this.saveStarToggledItem(stateCopy.messageList[index])
    this.setState({
      messageList: stateCopy.messageList
    })
  }

  async saveStarToggledItem(item) {
      const request = {messageIds: [item.id], command: 'star', star: item.starred}
      const response = await fetch('http://localhost:8083/api/messages', {
          method: 'PATCH',
          body: JSON.stringify(request),
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          }
      })
  }

  onMessageSelectToggled = (index) => {
    let stateCopy = Object.assign({}, this.state)
    stateCopy.messageList[index].selected = !stateCopy.messageList[index].selected

    this.setState({
      messageList: stateCopy.messageList
    })
  }

  onSelectAllClicked = () => {
    let stateCopy = Object.assign({}, this.state)

    //if any messages are not starred, star them all, else unstar them all
    if (stateCopy.messageList.find(message => !message.selected)) {
      stateCopy.messageList.map(message =>
        Object.assign(message, {selected: true})
      )
    } else {
      stateCopy.messageList.map(message =>
        Object.assign(message, {selected: false})
      )
    }

    this.setState({
      messageList: stateCopy.messageList
    })
  }

  onMarkMessagesClicked = (isMarkingRead) => {
    let stateCopy = Object.assign({}, this.state)
    stateCopy.messageList.map(message => message.selected ? message.read = isMarkingRead : '')
    this.saveMessagesRead(isMarkingRead, stateCopy.messageList)

    this.setState({
      messageList: stateCopy.messageList
    })
  }

  async saveMessagesRead(isMarkingRead, messageList) {
      const messageIdsList = messageList.filter(message => message.read === isMarkingRead && message.selected)

      const request = {messageIds: messageIdsList.map(message => message.id), command: 'read', read: isMarkingRead}
      const response = await fetch('http://localhost:8083/api/messages', {
          method: 'PATCH',
          body: JSON.stringify(request),
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          }
      })
  }

  onDeleteMessagesClicked = () => {
    let stateCopy = {...this.state}

      this.deleteMessages(stateCopy.messageList)

    this.setState({
      messageList: stateCopy.messageList.filter(message => !message.selected)
    })
  }

    async deleteMessages(messageList) {
        const selectedMessagesList = messageList.filter(message => message.selected)

        const request = {messageIds: selectedMessagesList.map(message => message.id), command: 'delete'}
        const response = await fetch('http://localhost:8083/api/messages', {
            method: 'PATCH',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    }

  onAddLabelClicked = (e) => {
    let stateCopy = Object.assign({}, this.state)
    //guard against the "Apply label" option
    if(e.target.selectedIndex === 0) return

    const selectedLabel = e.target.options[e.target.selectedIndex].text
    stateCopy.messageList.map(message => message.selected && !message.labels.find(label => label === selectedLabel) ? message.labels.push(selectedLabel) : '')

     this.saveAddedLabel(selectedLabel, stateCopy.messageList)
    this.setState({
      messageList: stateCopy.messageList
    })
  }

  async saveAddedLabel(selectedLabel, messageList) {
      const selectedMessagesList = messageList.filter(message => message.selected && message.labels.find(label => label === selectedLabel))
      const request = {messageIds: selectedMessagesList.map(message => message.id), command: 'addLabel', label: selectedLabel}
      const response = await fetch('http://localhost:8083/api/messages', {
          method: 'PATCH',
          body: JSON.stringify(request),
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          }
      })
  }

  onRemoveLabelClicked = (e) => {
    let stateCopy = Object.assign({}, this.state)
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    stateCopy.messageList.map(message => message.selected ? message.labels = message.labels.filter(label => label !== selectedLabel) : '')
    this.saveRemovedLabel(selectedLabel, stateCopy.messageList)

      this.setState({
      messageList: stateCopy.messageList
    })
  }

    async saveRemovedLabel(selectedLabel, messageList) {
        const selectedMessagesList = messageList.filter(message => message.selected && !message.labels.find(label => label === selectedLabel))
        const request = {messageIds: selectedMessagesList.map(message => message.id), command: 'removeLabel', label: selectedLabel}
        const response = await fetch('http://localhost:8083/api/messages', {
            method: 'PATCH',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    }


    selectedState = () => {
        const selectedCount = this.state.messageList.filter(message => message.selected).length
        if(selectedCount === 0) return 'none' //none selected
        else if(selectedCount === this.state.messageList.length) return 'all' //all selected
        else return 'some' //some selected
  }

  render() {
    return (
      <div>
        <Toolbar
          onSelectAllClicked={this.onSelectAllClicked}
          onMarkMessagesClicked={this.onMarkMessagesClicked}
          onDeleteMessagesClicked={this.onDeleteMessagesClicked}
          onAddLabelClicked={this.onAddLabelClicked}
          onRemoveLabelClicked={this.onRemoveLabelClicked}
          unreadMessageCount={this.state.messageList.filter(message => !message.read).length}
          selectedState={this.selectedState()} />
        <MessageList
          messageList={this.state.messageList}
          onMessagesStarredToggled={this.onMessagesStarredToggled}
          onMessageSelectToggled={this.onMessageSelectToggled}
        />
      </div>
    )
  }
}

export default App
