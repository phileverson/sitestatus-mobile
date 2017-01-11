import React from 'react';
import ReactDOM from 'react-dom';
import {Navigator, Toolbar, Tabbar, Tab, Splitter, SplitterSide, SplitterContent, Page, Button} from 'react-onsenui';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class Account extends React.Component {

    constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }


    renderTabs() {
    return [
      {
        content: <Login />,
        tab: <Ons.Tab label="Login" icon="ion-edit" />
      },
      {
        content: <SignUp />,
        tab: <Ons.Tab label="SignUp" icon="ion-film-marker" />
      }
    ];
  }
  renderPage() {
    route.props = route.props || {};
    route.props.navigator = navigator;

    return React.createElement(route.comp, route.props);
  }


    render() {
      return (
      <Ons.Tabbar
        index={this.state.index}
        onPreChange={(event) =>
          {
            if (event.index != this.state.index) {
              this.setState({index: event.index});
            }
          }
        }
        renderTabs={this.renderTabs}
      />
      );
    }
  };

module.exports = Account;