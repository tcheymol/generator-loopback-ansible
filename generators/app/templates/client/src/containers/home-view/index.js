import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { FlatButton } from 'material-ui';
import styles from './style.css';

export class HomeView extends Component {

  render() {
    return (
      <div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <FlatButton onClick={() => browserHistory.push('/page')}>Click me!</FlatButton>
        <Link to='/page' >Or use a link!</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeView);
