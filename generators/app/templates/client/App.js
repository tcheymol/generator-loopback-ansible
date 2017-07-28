import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import routes from './routes';

const muiTheme = getMuiTheme(lightBaseTheme, {
  fontFamily: 'Roboto, sans-serif',
});

class App extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired, // eslint-disable-line
    history: React.PropTypes.object.isRequired, // eslint-disable-line
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router history={this.props.history} routes={routes} />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
