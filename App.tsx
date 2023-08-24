import * as React from 'react';
import {RecoilRoot} from 'recoil';
import AppInner from './AppInner';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <RecoilRoot>
      <AppInner />
    </RecoilRoot>
  );
}

export default App;
