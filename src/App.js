import React, {Component} from 'react'
import Toolbar from './components/Toolbar'
import Message from './components/Message'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Toolbar/>
        <Message read={true} selected={true} starred={true} labels={['dev', 'personal']}/>
      </div>
    )
  }
}

export default App
