import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, List, ListItem, ListHeader, ToolbarButton, Icon, Splitter, SplitterSide, SplitterContent, Page, Button} from 'react-onsenui';

import Nav from './components/nav.jsx';
import PagesConstants from './constants/pages.jsx';

// Pages:
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Projects from './components/Projects.jsx';
import Account from './components/Account.jsx';
import SignUp from './components/SignUp.jsx';
import NewProjects from './components/NewProjects.jsx';

// var Nav = require('./components/nav.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      currentPage: PagesConstants.DEFAULT
    };
  }

  show() {
    this.setState({
      isOpen: true
    });
  }

  hide() {
    this.setState({
      isOpen: false
    });
  }

  togglePageProjects() {
    this.setState({
      currentPage: PagesConstants.PROJECTS,
      isOpen: false
    });
  }
  togglePageAccount() {
    this.setState({
      currentPage: PagesConstants.ACCOUNT,
      isOpen: false
    });
  }
  // togglePageProjects() {
  //   this.setState({
  //     currentPage: PagesConstants.PROJECTS,
  //     isOpen: false
  //   });
  // }
  // togglePageProjects() {
  //   this.setState({
  //     currentPage: PagesConstants.PROJECTS,
  //     isOpen: false
  //   });
  // }

  render() {
    var pageToRenderComponent = <NewProjects />;
    var pageToRender = this.state.currentPage;

    if (pageToRender == PagesConstants.PROJECTS) {
      pageToRenderComponent = <Projects />;
    } else if (pageToRender == PagesConstants.ACCOUNT) {
      pageToRenderComponent = <Account />;
    } else {
      pageToRenderComponent = <NewProjects2 />;
    }

    return (
      <Splitter>
        <SplitterSide
          side='left'
          collapse={true}
          isOpen={this.state.isOpen}
          onClose={this.hide.bind(this)}
          isSwipeable={true}>
          <Page>
            <List renderHeader={() => <ListHeader></ListHeader>}>
              <ListItem modifier='longdivider' onClick={this.togglePageProjects.bind(this)} tappable>Projects</ListItem>
              <ListItem modifier='longdivider' onClick={this.togglePageAccount.bind(this)} tappable>Account</ListItem>
              <ListItem modifier='longdivider' tappable>456</ListItem>
            </List>
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page>
            <Toolbar>
              <div className='left'>
                <ToolbarButton onClick={this.show.bind(this)}>
                  <Icon icon='ion-navicon, material:md-menu' />
                </ToolbarButton>
              </div>
              <div className='center'>SiteStatus</div>
            </Toolbar>
            {pageToRenderComponent}
          </Page>
        </SplitterContent>
      </Splitter>
    );
  }
}

module.exports = App;