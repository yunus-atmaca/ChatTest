import 'react-native-get-random-values'

import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import stores from './src/stores';

function Root() {
  return (
    <Provider store={stores}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Root);
