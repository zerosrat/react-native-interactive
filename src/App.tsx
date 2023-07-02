/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {InteratveScreen} from './pages/interactive-screen';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <InteratveScreen />
    </SafeAreaProvider>
  );
}

export default App;
