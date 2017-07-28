import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import styles from './style.css';

export class Page extends Component {

  render() {
    return (
      <div className={style.container}>
        Hello World in page 1
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
)(Page);
