import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {styles} from './signUp.style';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {firebaseConfig} from '../../../../firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false); // New state for tracking signing up

  const handleSignUp = async () => {
    if (isSigningUp) return; // Prevent double clicking while signing up

    try {
      setIsSigningUp(true); // Set signing up state to true
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User registered successfully!', user);
      Alert.alert('Success', '회원가입 성공');
    } catch (error) {
      console.error('Error during registration:', error.message);
      Alert.alert('Error', '회원가입 실패');
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>벙개 회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <Button title="회원가입" onPress={handleSignUp} disabled={isSigningUp} />
    </View>
  );
}
