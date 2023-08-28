import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    marginBottom: 30,
  },
  inputContents: {
    width: '100%',
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  Pressable: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
