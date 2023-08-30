import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  centerContent: {
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 70,
  },
  event: {
    backgroundColor: '#EFFFFD',
    width: '100%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: '700',
  },
  resortBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  editBox: {
    display: 'flex',
    flexDirection: 'row',
  },

  resort: {
    fontWeight: '700',
  },
  delete: {
    marginLeft: 10,
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    marginRight: 10,
    fontSize: 25,
    fontWeight: '800',
  },
  contents: {
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 100,
  },

  button: {
    width: '100%',
    backgroundColor: '#EFFFFD',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  buttonText: {
    fontSize: 20,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
