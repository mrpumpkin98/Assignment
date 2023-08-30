import React, {useEffect, useState, useRef} from 'react';
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
import {styles} from './chat.style';
import {formatTimestamp} from '../../commons';

interface Message {
  senderId: string;
  message: string;
  timestamp: Date;
}

export default function ChatScreen() {
  const route = useRoute();
  const {chatRoomId} = route.params as {chatRoomId: any};
  const user = useRecoilValue(userState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef(null); // useRef 추가

  useEffect(() => {
    const chatRoomRef = db.collection('chatRooms').doc(chatRoomId);

    const unsubscribe = chatRoomRef
      .collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const updatedMessages = snapshot.docs.map(doc => doc.data());
        setMessages(updatedMessages);

        // 메시지 업데이트 시에 스크롤을 아래로 이동
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({animated: true});
        }
      });

    return () => unsubscribe();
  }, [chatRoomId]);

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      const chatRoomRef = db.collection('chatRooms').doc(chatRoomId);

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
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // ref 연결
        style={styles.chatList}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <>
            <View>
              <Text>
                {item.senderId === user.email
                  ? ''
                  : item.senderId.split('@')[0]}
              </Text>
              <View
                style={[
                  styles.messageBox,
                  item.senderId === user.email
                    ? styles.ownMessageBox
                    : styles.otherMessageBox,
                ]}>
                {item.senderId === user.email && (
                  <Text>{formatTimestamp(item.timestamp)}</Text>
                )}
                <Text
                  style={[
                    styles.messageContainer,
                    item.senderId === user.email
                      ? styles.ownMessage
                      : styles.otherMessage,
                  ]}>
                  {item.message}
                </Text>
                {item.senderId !== user.email && (
                  <Text>{formatTimestamp(item.timestamp)}</Text>
                )}
              </View>
            </View>
          </>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.KeyboardAvoidingView}>
        <TextInput
          placeholder="메시지 입력"
          value={messageText}
          onChangeText={text => setMessageText(text)}
          style={styles.TextInput}
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          style={styles.TouchableOpacity}>
          <Text style={{color: 'gray'}}>전송</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
