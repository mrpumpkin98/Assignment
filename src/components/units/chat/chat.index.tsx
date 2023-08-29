import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {db} from '../../../../firebaseConfig';
import {useRecoilValue} from 'recoil';
import {userState} from '../../../store/index';

export default function ChatScreen() {
  const route = useRoute();
  const {chatRoomId} = route.params;
  const user = useRecoilValue(userState);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const chatRoomRef = db.collection('chatRooms').doc(chatRoomId);

    const unsubscribe = chatRoomRef
      .collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const updatedMessages = snapshot.docs.map(doc => doc.data());
        setMessages(updatedMessages);
      });

    return () => unsubscribe();
  }, [chatRoomId]);

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      const chatRoomRef = db.collection('chatRooms').doc(chatRoomId);
      console.log(user);
      const messageData = {
        senderId: user.email,
        message: messageText,
        timestamp: new Date(),
      };

      chatRoomRef.collection('messages').add(messageData);
      setMessageText('');
    }
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text
            style={{
              padding: 10,
              alignSelf:
                item.senderId === user.email ? 'flex-end' : 'flex-start',
            }}>
            {item.senderId === user.email ? '본인' : item.senderId}:{' '}
            {item.message}
          </Text>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{borderTopWidth: 1, borderColor: '#ccc', padding: 10}}>
        <TextInput
          placeholder="메시지 입력"
          value={messageText}
          onChangeText={text => setMessageText(text)}
          style={{borderWidth: 1, borderColor: '#ccc', padding: 10}}
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          style={{alignSelf: 'flex-end', marginTop: 5}}>
          <Text style={{color: 'blue'}}>전송</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
