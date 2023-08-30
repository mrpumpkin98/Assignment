import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Write from './src/screen/Edit';
import Detail from './src/screen/Detail';
import Edit from './src/screen/Edit';
import List from './src/screen/List';
import SignIn from './src/screen/SignIn';
import SignUp from './src/screen/SignUp';
import Chat from './src/screen/Chat';
import {useState} from 'react';
import {Text, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {userState} from './src/store';

const Stack = createStackNavigator();

export default function AppInner() {
  const user = useRecoilValue(userState);
  const isLoggedIn = user.isLoggedIn;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="벙개" component={List} />
            <Stack.Screen
              name="Details"
              component={Detail}
              options={({route}) => ({title: route.params.item.title})}
            />
            <Stack.Screen name="벙개 / 방만들기" component={Write} />
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={({route}) => ({title: route.params.title})}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
