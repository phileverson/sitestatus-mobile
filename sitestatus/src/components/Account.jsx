import React from 'react';
import ReactDOM from 'react-dom';

import {Navigator, Toolbar, Tabbar, Tab, Splitter, SplitterSide, SplitterContent, Page, Button} from 'react-onsenui';

import PagesConstants from '../constants/pages.jsx';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class Account extends React.Component {

    constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderTabs() {
    return [
      {
        content: <SignUp />,
        tab: <Tab label="SignUp" icon="ion-ios-home-outline" />
      },
      {
        content: <Login />,
        tab: <Tab label="Login" icon="ion-ios-albums-outline" />
      }];
  }

    render() {
      return (
        <Page>
          <Tabbar renderTabs={this.renderTabs}>
          </Tabbar>
        </Page>
      );
    }
  };

module.exports = Account;