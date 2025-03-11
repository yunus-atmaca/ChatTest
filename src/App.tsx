import Chat from './Chat';

import React, {useEffect} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PortalProvider} from '@gorhom/portal';
import isToday from 'dayjs/plugin/isToday';
import dayjs from 'dayjs';

function App(): React.JSX.Element {
  useEffect(() => {
    dayjs.extend(isToday);
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider style={{flex: 1}}>
        <PortalProvider>
          <NavigationContainer>
            <Chat />
          </NavigationContainer>
        </PortalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
