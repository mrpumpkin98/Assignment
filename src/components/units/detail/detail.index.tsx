import React from 'react';
import {Text, View, Image, Button, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './detail.style';
import DismissKeyboardView from '../../commons/DismissKeyboardView';
import {useRecoilValue} from 'recoil';
import {db} from '../../../../firebaseConfig';
import {userState} from '../../../store/index';

interface Item {
  id: any;
  title: string;
  resort: string;
  event: string;
  createdAt: string;
  person: number;
  contents: string;
}

export default function DetailScreen() {
  const route = useRoute();
  const item = route.params?.item as Item;
  const navigation = useNavigation();
  const user = useRecoilValue(userState);

  const handleChatPress = async () => {
    try {
      // const chatRoomRef = await db.collection('chatRooms').add({
      //   // 필요한 채팅방 정보를 생성 (예: 참여자 목록, 생성 시간 등)
      //   participants: [user.email],
      //   createdAt: new Date(),
      // });

      const chatRoomId = item.id;
      navigation.navigate(
        'Chat' as never,
        {chatRoomId, title: item.title} as never,
      );
    } catch (error) {
      console.error('에러 : ', error);
    }
  };

  const handleDeletePress = async () => {
    try {
      await db.collection('post_room').doc(item.id).delete();
      navigation.goBack();
    } catch (error) {
      console.error('에러 : ', error);
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
              <Text style={styles.delete} onPress={handleDeletePress}>
                삭제
              </Text>
            </View>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Image
            source={require('Assignment/src/images/ski.png')}
            style={styles.image}
          />
          <Text style={styles.contents}>{item.contents}</Text>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleChatPress}>
              <Text style={styles.buttonText}>참여하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
}
