import React from 'react';
import ReactDOM from 'react=dom';
import AppRoot from './components/AppRoot';
import { AppContainer } from 'react-hot-loader';

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('react-root')
  );
}

render(AppRoot);

// Hot Reload
if (module.hot) {
  module.hot.accept('./components/AppRoot.js', () => {
    const NewAppRoot = require('./components');
    render(NewAppRoot);
  });
}
