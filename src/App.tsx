import React from 'react';
import {View} from 'react-native';

import Chat from './Chat';

function App(): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <Chat></Chat>
    </View>
  );
}

export default App;
