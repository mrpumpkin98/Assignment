import React, {useState} from 'react';
import {View, Text, TextInput, Button, Pressable, Alert} from 'react-native';
import {styles} from './signin.style';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {useRecoilState} from 'recoil';
import {refreshTokenState, userState} from '../../../store';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false); // New state for tracking signing in
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);

  const handleSignIn = async () => {
    if (isSigningIn) return;

    try {
      setIsSigningIn(true);
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const firebaseUser = userCredential.user;
      if (firebaseUser) {
        setUser({
          isLoggedIn: true,
          nickname: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
        });
        const idToken: string = await firebaseUser.getIdToken();
        setRefreshToken(firebaseUser.refreshToken);

        console.log('ID Token:', idToken);
        console.log('Refresh Token:', refreshToken);
        Alert.alert('Success', '로그인 성공');
      } else {
        Alert.alert('Error', '로그인 실패');
      }
    } catch (error) {
      Alert.alert('Error', '로그인 실패');
    } finally {
      setIsSigningIn(false);
    }
  };

  const toSignUp = () => {
    navigation.navigate('SignUp' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>벙개 로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="로그인" onPress={handleSignIn} disabled={isSigningIn} />
      <Pressable onPress={toSignUp} style={styles.toSignUp}>
        <Text>회원가입하기</Text>
      </Pressable>
    </View>
  );
}
