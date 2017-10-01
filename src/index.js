import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { fetchMessages } from './actions/messageListActions';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

store.dispatch(fetchMessages())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/compose' component={App} />
          <Route path='/messages/:id' component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
