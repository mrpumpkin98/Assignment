import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8FFF9',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
  },
  ownMessage: {
    marginLeft: 10,
    backgroundColor: 'yellow', // 본인 메시지 배경색
  },
  otherMessage: {
    marginRight: 10,
    backgroundColor: 'white', // 상대방 메시지 배경색
  },
  ownMessageBox: {
    alignSelf: 'flex-end',
  },
  otherMessageBox: {
    alignSelf: 'flex-start',
  },
  chatList: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  messageBox: {
    flexDirection: 'row', // 가로 방향으로 배치
    justifyContent: 'flex-start', // 왼쪽 정렬 (기본 값)
    alignItems: 'center', // 수직 중앙 정렬
  },
  KeyboardAvoidingView: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#EFFFFD',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '85%',
    backgroundColor: '#FFFFFF',
  },
  TouchableOpacity: {
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
