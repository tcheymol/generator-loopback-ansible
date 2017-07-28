import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import styles from './style.css';

export class HomeView extends Component {

  render() {
    return (
      <div className={style.container}>
        Hello World
      </div>
    );
  }
}

HomeView.propTypes = {};

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
