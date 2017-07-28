import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import frMessages from '../../locale/locale-fr';

const locales = {
  fr: frMessages,
};

addLocaleData([...fr]);

export class Root extends Component {
  render() {
    return (
      <div>
        <IntlProvider locale='fr' messages={locales['fr']} >
          <div>
            {this.props.children}
          </div>
        </IntlProvider>
      </div>
    );
  }

}

Root.propTypes = {
  children: PropTypes.element,
};

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
