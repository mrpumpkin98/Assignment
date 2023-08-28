import React, {ChangeEvent, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Pressable,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './write.style';
import {RadioButton} from 'react-native-paper';
import DismissKeyboardView from '../../commons/DismissKeyboardView';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/compat/firestore';
import {db, firebaseConfig} from '../../../../firebaseConfig';
import {getCurrentFormattedDateTime} from '../../commons';

export default function WriteScreen(props: any) {
  const [selectedResort, setSelectedResort] = useState('스키장1');
  const [selectedPerson, setSelectedPerson] = useState('1');
  const [selectedEvent, setSelectedEvent] = useState('스키');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const navigation = useNavigation();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const resorts = ['스키장1', '스키장2', '스키장3'];
  const person = ['1', '2', '3', '4', '5', '6', '7'];
  const eventOptions = ['스키', '보드', '무관'];

  const handleResortChange = (itemValue: string) => {
    setSelectedResort(itemValue);
    console.log('선택된 스키장:', itemValue);
  };

  const handlePersonChange = (itemValue: string) => {
    setSelectedPerson(itemValue);
    console.log('선택된 인원:', itemValue);
  };

  const handleEventChange = (selectedEvent: string) => {
    setSelectedEvent(selectedEvent);
    console.log('선택된 종목:', selectedEvent);
  };

  const onChangeTitle = (value: string) => {
    setTitle(value);
    console.log(value);
  };

  const onChangeContents = (value: string) => {
    setContents(value);
    console.log(value);
  };

  const toSubmit = async () => {
    if (isSigningUp) return;

    try {
      setIsSigningUp(true);
      const fullFormattedDateTime = getCurrentFormattedDateTime();
      await db.collection('post_room').add({
        resort: selectedResort,
        person: selectedPerson,
        event: selectedEvent,
        title: title,
        contents: contents,
        createdAt: fullFormattedDateTime,
      });
      console.log('데이터가 성공적으로 저장되었습니다.');
      navigation.navigate('벙개' as never);
    } catch (error) {
      console.error('데이터 저장 중 오류 발생:', error);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Text style={styles.label}>스키장</Text>
        <Picker
          selectedValue={selectedResort}
          onValueChange={handleResortChange}>
          {resorts.map(resort => (
            <Picker.Item key={resort} label={resort} value={resort} />
          ))}
        </Picker>
        <Text style={styles.label}>인원</Text>
        <Picker
          selectedValue={selectedPerson}
          onValueChange={handlePersonChange}>
          {person.map(person => (
            <Picker.Item key={person} label={person} value={person} />
          ))}
        </Picker>
        <Text style={styles.label}>종목</Text>
        {eventOptions.map(option => (
          <RadioButton.Item
            key={option}
            label={option}
            value={option}
            status={selectedEvent === option ? 'checked' : 'unchecked'}
            onPress={() => handleEventChange(option)}
          />
        ))}
        <Text style={styles.label}>벙개 이름</Text>
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={onChangeTitle}
        />
        <Text style={styles.label}>추가 내용</Text>
        <TextInput
          style={styles.inputContents}
          placeholder="내용"
          value={contents}
          onChangeText={onChangeContents}
          multiline={true}
          numberOfLines={4}
        />

        <Button title="등록" onPress={toSubmit} disabled={isSigningUp} />
      </View>
    </DismissKeyboardView>
  );
}
