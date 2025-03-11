import Chat from './Chat';

import React, {useEffect} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import isToday from 'dayjs/plugin/isToday';
import dayjs from 'dayjs';

function App(): React.JSX.Element {
  useEffect(() => {
    dayjs.extend(isToday);
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider style={{flex: 1}}>
        <NavigationContainer>
          <Chat />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
