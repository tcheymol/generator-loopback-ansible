import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import frMessages from '../../translations/fr.json';
import logo from './logo.svg';
import './style.css';

const locales = {
  fr: frMessages,
};

addLocaleData([...fr]);

export class Root extends Component {
  static propTypes = {
    children: React.PropTypes.element,
  };

  render() {
    return (
      <div>
        <IntlProvider locale='fr' messages={locales['fr']} >
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            {this.props.children}
          </div>
        </IntlProvider>
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
)(Root);
