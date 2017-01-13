import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Label, Input, Splitter, SplitterSide, SplitterContent, Page, Button} from 'react-onsenui';

class SignUp extends React.Component {

    render() {
      return (
      <Page>
        <h1>SignUp</h1>
        <span>Email:</span>
        <Input placeholder="Email Address" />
      </Page>
      );
    }
  };

module.exports = SignUp;