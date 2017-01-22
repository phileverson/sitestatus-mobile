import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, List, ListItem, ListHeader, ToolbarButton, Icon, Splitter, SplitterSide, SplitterContent, Page, Button} from 'react-onsenui';

import Nav from './components/nav.jsx';
import PagesConstants from './constants/pages.jsx';

// Pages:
import Home from './components/Home.jsx';
import Projects from './components/Projects.jsx';
import NewProject from './components/NewProject.jsx';
import Account from './components/Account.jsx';

var App = React.createClass({
  mixins: [ReactFireMixin],
  // ...

// class App extends React.Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isOpen: false,
  //     currentPage: PagesConstants.DEFAULT
  //   };
  // },

  getInitialState: function(){
    return {
      isOpen: false,
      currentPage: PagesConstants.DEFAULT
    }
  },

  componentWillMount: function() {
  var ref = firebase.database().ref("items");
  this.bindAsArray(ref, "items");
  // console.log('hi');
  },


  show: function() {
//     firebase.auth().createUserWithEmailAndPassword('phil@phileverson.com', 'testtttt').catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
//   console.log(errorCode);
//   console.log(errorMessage);
// });

  //    this.firebaseRefs.items.push({
  //   text: "asdfas"
  // });

    this.setState({
      isOpen: true
    });
  },

  hide: function() {
    this.setState({
      isOpen: false
    });
  },
  togglePageProjects: function() {
    this.setState({
      currentPage: PagesConstants.PROJECTS,
      isOpen: false
    });
  },
  togglePageAddProject: function() {
    this.setState({
      currentPage: PagesConstants.ADD_PROJECT,
      isOpen: false
    });
  },
  togglePageAccount: function() {
    this.setState({
      currentPage: PagesConstants.ACCOUNT,
      isOpen: false
    });
  },

  renderRightButton: function() {
    if (this.state.currentPage == PagesConstants.PROJECTS) {
      return (
          <ToolbarButton onClick={this.togglePageAddProject.bind(this)}>
            <Icon icon='ion-plus, material:md-menu' />
          </ToolbarButton>
        )
    }
    if (this.state.currentPage == PagesConstants.ADD_PROJECT) {
      return (
          <ToolbarButton onClick={this.togglePageProjects.bind(this)}>
            Cancel
          </ToolbarButton>
        )
    }
  },

  render: function() {
    var pageToRenderComponent = <Home openMenu={this.show}/>;
    var pageToRender = this.state.currentPage;

    if (pageToRender == PagesConstants.PROJECTS) {
      pageToRenderComponent = <Projects />;
    } else if (pageToRender == PagesConstants.ACCOUNT) {
      pageToRenderComponent = <Account />;
    } else if (pageToRender == PagesConstants.ADD_PROJECT) {
      pageToRenderComponent = <NewProject />;
    }

    var rightButton = this.renderRightButton();

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
            </List>
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page>
            {pageToRenderComponent}
          </Page>
        </SplitterContent>
      </Splitter>
    );
  }
});

module.exports = App;