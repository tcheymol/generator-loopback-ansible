import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from './style.css';

export class Page extends Component {

  render() {
    return (
      <div className={styles.container}>
        <Link to='/'>Back</Link>
      </div>
    );
  }
}

Page.propTypes = {};

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
