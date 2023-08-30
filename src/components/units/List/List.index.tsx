import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {styles} from './List.style';
import {useNavigation} from '@react-navigation/native';
import {db} from '../../../../firebaseConfig';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import {useRecoilState} from 'recoil';
import {userState} from '../../../store';

interface DocumentData {
  title: string;
  contents: string;
  event: string;
  resort: string;
  person: number;
  id: any;
  createdAt: string;
}

export default function ListScreen() {
  const navigation = useNavigation();
  const [postData, setPostData] = useState<DocumentData[]>([]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = db.collection('post_room').onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as DocumentData[];
          setPostData(data);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData();
  }, []);

  const toWrite = () => {
    navigation.navigate('벙개 / 방만들기' as never);
  };

  const toLogOut = async () => {
    try {
      await firebase.auth().signOut(); // Firebase 로그아웃
      setUser({
        isLoggedIn: false,
        nickname: '',
        email: '',
      });
      navigation.navigate('SignIn' as never);
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };

  const handleItemPress = (item: DocumentData) => {
    navigation.navigate('Details' as never, {item} as never);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.list}
            onPress={() => handleItemPress(item)}>
            <Image
              source={require('Assignment/src/images/ski.png')}
              style={{width: 90, height: 90, borderRadius: 4}}
            />
            <View style={styles.listBox}>
              <Text style={styles.resort}>{item.resort}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.listBoxTie}>
                <Text style={styles.createdAt}>{item.createdAt}</Text>
                <Text style={styles.person}>1/{item.person}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.buttonLogOut} onPress={toLogOut}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={toWrite}>
        <Text style={styles.buttonText}>방만들기</Text>
      </TouchableOpacity>
    </View>
  );
}
