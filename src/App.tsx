import React from 'react';
import {View} from 'react-native';

import Chat from './Chat';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <NavigationContainer>
        <Chat />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
