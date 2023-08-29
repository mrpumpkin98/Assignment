import React from 'react';
import {Text, View, Image, Button, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './detail.style';
import DismissKeyboardView from '../../commons/DismissKeyboardView';
import {useRecoilValue} from 'recoil';
import {db} from '../../../../firebaseConfig';
import {userState} from '../../../store/index';

interface Item {
  title: string;
  resort: string;
  event: string;
  createdAt: string;
  person: number;
  contents: string;
  // 기타 아이템 속성을 추가할 수 있음
}

export default function DetailScreen() {
  const route = useRoute();
  const item = route.params?.item as Item;
  const navigation = useNavigation();
  const user = useRecoilValue(userState);

  const handleChatPress = async () => {
    try {
      const chatRoomRef = await db.collection('chatRooms').add({
        // 필요한 채팅방 정보를 생성 (예: 참여자 목록, 생성 시간 등)
        participants: [user.email], // 유저 이메일을 참여자로 추가
        createdAt: new Date(),
      });

      const chatRoomId = item.id;

      // 채팅방 ID를 채팅 화면으로 전달하면서 이동
      console.log(chatRoomId);
      navigation.navigate('Chat' as never, {chatRoomId} as never);
    } catch (error) {
      console.error('Error creating chat room: ', error);
    }
  };

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.event}>{item.event}</Text>
          <View style={styles.resortBox}>
            <View>
              <Text style={styles.resort}>{item.resort}</Text>
              <Text>{item.createdAt}</Text>
            </View>
            <View style={styles.editBox}>
              <Text>수정</Text>
              <Text style={styles.delete}>삭제</Text>
            </View>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>1/{item.person}</Text>
          </View>
          <Image
            source={require('Assignment/src/images/ski.png')}
            style={styles.image}
          />
          <Text style={styles.contents}>{item.contents}</Text>
          <TouchableOpacity style={styles.button} onPress={handleChatPress}>
            <Text style={styles.buttonText}>참여하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboardView>
  );
}
