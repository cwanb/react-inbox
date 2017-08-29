import React, {
  Component
} from 'react'
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import './App.css'

const seedMessages = [{
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
];

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messageList: seedMessages
    }
  }

  onMessagesStarredToggled = (index) => {
    var stateCopy = Object.assign({}, this.state)
    stateCopy.messageList[index].starred = !stateCopy.messageList[index].starred

    this.setState({
      messageList: stateCopy.messageList
    })
  }

  onMessageSelectToggled = (index) => {
    var stateCopy = Object.assign({}, this.state)
    stateCopy.messageList[index].selected = !stateCopy.messageList[index].selected

    this.setState({
      messageList: stateCopy.messageList
    })
  }

  onSelectAllClicked = () => {
    var stateCopy = Object.assign({}, this.state)

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
    var stateCopy = Object.assign({}, this.state)

    stateCopy.messageList.map(message => message.selected ? message.read = isMarkingRead : '')

    this.setState({
      messageList: stateCopy.messageList
    })
  }

  onDeleteMessagesClicked = () => {
    var stateCopy = Object.assign({}, this.state)

    this.setState({
      messageList: stateCopy.messageList.filter(message => !message.selected)
    })
  }

  onAddLabelClicked = (e) => {
    var stateCopy = Object.assign({}, this.state)
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    stateCopy.messageList.map(message => message.selected && !message.labels.find(label => label === selectedLabel) ? message.labels.push(selectedLabel) : '')

    this.setState({
      messageList: stateCopy.messageList
    })
  }

  onRemoveLabelClicked = (e) => {
    var stateCopy = Object.assign({}, this.state)
    const selectedLabel = e.target.options[e.target.selectedIndex].text
    stateCopy.messageList.map(message => message.selected ? message.labels = message.labels.filter(label => label !== selectedLabel) : '')

    this.setState({
      messageList: stateCopy.messageList
    })
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
          unreadMessageCount={this.state.messageList.filter(message => !message.read).length}/>
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
