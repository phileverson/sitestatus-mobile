import React from 'react';
import ReactDOM from 'react-dom';

var ons = require('onsenui');
var Ons = require('react-onsenui');

var CarouselTest = React.createClass({
  getInitialState: function() {
    return {
      items: [
        '#F1948A',
        '#D7BDE2',
        '#85C1E9',
        '#73C6B6',
      ],
      index: 0
    };
  },

  handleChange(e) {
    this.setState({index: e.activeIndex});
  },

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>Carousel</div>
      </Ons.Toolbar>
    );
  },

  setIndex(index) {
    this.setState({index: index});
  },

  render: function() {
    return (
    <Ons.Page renderToolbar={this.renderToolbar}>
        <Ons.Carousel onPostChange={this.handleChange} index={this.state.index} itemWidth="60%" fullscreen swipeable autoScroll overscrollable>
          {this.state.items.map((item, index) => (
            <Ons.CarouselItem key={index} style={{backgroundColor: item}}>
              <div style={{marginTop: '50%', textAlign: 'center'}}>
                Swipe me!
              </div>
              </Ons.CarouselItem>
          ))}
        </Ons.Carousel>

        <div style={{
          textAlign: 'center',
          fontSize: '20px',
          position: 'absolute',
          bottom: '36px',
          left: '0px',
          right: '0px'
        }}>
          {this.state.items.map((item, index) => (
            <span key={index} style={{cursor: 'pointer'}} onClick={this.setIndex.bind(this, index)}>
              {this.state.index === index ? '\u25CF' : '\u25CB'}
            </span>
          ))}
        </div>
      </Ons.Page>
    );
  }
});



module.exports = CarouselTest;