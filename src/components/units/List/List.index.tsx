import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {styles} from './List.style';
import {useNavigation} from '@react-navigation/native';
import {db} from '../../../../firebaseConfig';

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

        // Return a cleanup function to unsubscribe from the snapshot listener
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={toWrite}>
          방만들기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
