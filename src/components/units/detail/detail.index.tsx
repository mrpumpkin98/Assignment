import React from 'react';
import {Text, View, Image, Button, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {styles} from './detail.style';
import DismissKeyboardView from '../../commons/DismissKeyboardView';

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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>참여하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboardView>
  );
}
